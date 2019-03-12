import * as React from 'react'; 
import { INewROProps } from './INewRO';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton, PrimaryButton, IButtonProps,IconButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import styles from './NewRO.module.scss' 
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { DateTimePickerSettings } from '../Statics/DateTimePickerSettings';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ComboBox } from 'office-ui-fabric-react';
import Comments from '../Controls/Comments/Comments';
////README!!!////
//To Trigger this panel you can use this code from console:
//event = new CustomEvent('ROactionDEPA');
//event.initEvent('ROactionDEPA',true,true);
//document.dispatchEvent(event);

export default class NewRO extends React.Component<INewROProps, any> {

  roTypes=[
    {key:"DEPA",text:"DEPA"},
    {key:"DEPU",text:"DEPU"},
    {key:"Volontary",text:"Volontary"}
  ];
    
  airports=[
    { key: 'Poland', text: 'Poland', itemType: DropdownMenuItemType.Header },
    { key: '1', text: 'Poland::Warsaw::Chopin' },
    { key: '2', text: 'Poland::Cracow::Wawel' },
    { key: 'France', text: 'France', itemType: DropdownMenuItemType.Header },
    { key: '3', text: 'France::Paris::de\'Gaulle' }
  ];

  commentsContent=[
    {name:"Jan Kowalski", description:"Lorem ipsum dolor sum ", created:"05/03/2019, 15:50:08"},
    {name:"Jan Kowalski", description:"Lorem ipsum dolor sum Lorem ipsum dolor sum Lorem ipsum dolor sum", created:"05/03/2019, 15:50:08"}
  ];


  dateSettings:DateTimePickerSettings = new DateTimePickerSettings();

  constructor(data:INewROProps){
    super(data);
    console.log("PROPS",this.props);
    this.state = {
      viaDeparture : [  
        { id:'1', text: 'Poland::Warsaw::Chopin', nightsToStay:0 },
        { id:'2', text: 'Poland::Warsaw::Chopin', nightsToStay:0 }],

      viaReturn : [
        { id:'3', text: 'Poland::Warsaw::Chopin', nightsToStay:1 },
        { id:'2', text: 'Poland::Warsaw::Chopin', nightsToStay:2 }]
      };
 

    this.addDepartureVia = this.addDepartureVia.bind(this);
    this.addReturnVia = this.addReturnVia.bind(this);
    
    this.removeDepartureVia = this.removeDepartureVia.bind(this);
    this.removeReturnVia = this.removeReturnVia.bind(this);
  }
  
  addDepartureVia(){
    let old = this.state.viaDeparture;    
    old.push({id:'0',text:'',nightsToStay:0});
    this.setState({ viaDeparture : old});
  }
  
  addReturnVia(){
    let old = this.state.viaReturn;    
    old.push({id:'0',text:'',nightsToStay:0});
    this.setState({ viaReturn : old});
  }

  removeDepartureVia(index:number){
    let old = this.state.viaDeparture;    
    //removalhere
    old.splice(index,1);
    this.setState({ viaDeparture : old});
  }

  removeReturnVia(index:number){
    let old = this.state.viaReturn;    
    //removalhere
    old.splice(index,1);
    this.setState({ viaReturn : old});
  }

  public render(): React.ReactElement<INewROProps> {

    
    return (              
      <div className={styles.newRO}>
        <div className={"ms-Grid "+styles.scrollContainer} dir="ltr">
          <div className={"ms-Grid-row "+ styles.rowSpacing}>        
            <div className={"ms-Grid-col ms-md3"}>Status:</div>
            <div className={"ms-Grid-col ms-md4"}>NEW</div>
          </div>
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Operation Type:</div>
            <div className={"ms-Grid-col ms-md4"}>
              <Dropdown
                placeholder="Select an Option"
                selectedKey={this.props.type}
                options={this.roTypes}
              />
            </div>
          </div>             
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Operation Date:*</div>
            <div className={"ms-Grid-col ms-md4"}>
              <DatePicker 
                firstDayOfWeek={DayOfWeek.Monday} 
                strings={this.dateSettings.DayPickerStrings} 
                placeholder="Select a date..." 
                ariaLabel="Select a date" />
            </div>
            <div className={"ms-Grid-col ms-md2"}>From Hour:</div>
            <div className={"ms-Grid-col ms-md2"}>
              <TextField
                defaultValue="00:00"              
              />            
            </div>
          </div>  
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Departure Place:*</div>
            <div className={"ms-Grid-col ms-md8"}>         
              <ComboBox 
                placeholder="Select place or type it"
                allowFreeform
                autoComplete="on"
                options={this.airports}
              />
            </div>
            <div className={"ms-Grid-col ms-md1"}>
              <div onClick={this.addDepartureVia}>
                <IconButton 
                  iconProps={{ iconName: 'Add' }} 
                  ariaLabel="Add Via" 
                  rootProps={{onclick:this.addDepartureVia}}
                />
              </div>
            </div>
          </div>
          {this.state.viaDeparture.map((vd,index)=> (
            <div>
              <div className={"ms-Grid-row "+ styles.rowSpacing}>
                <div className={"ms-Grid-col ms-md3 ms-textAlignRight"}>Via {index+1}:</div>
                <div className={"ms-Grid-col ms-md8"}>     
                  <ComboBox 
                    selectedKey={vd.id}
                    placeholder="Select place or type it"
                    allowFreeform
                    autoComplete="on"
                    options={this.airports}
                  />
                </div>
                <div className={"ms-Grid-col ms-md1"}>   
                  <div onClick={()=>{this.removeDepartureVia(index)}}>
                    <IconButton iconProps={{ iconName: 'Cancel' }} ariaLabel="Remove Via" />
                  </div>
                </div>
              </div>          
            </div>   
          ))}
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Destination Place:*</div>
            <div className={"ms-Grid-col ms-md8"}> 
              <ComboBox 
                placeholder="Select place or type it"
                allowFreeform
                autoComplete="on"
                options={this.airports}
              />
              </div>
            <div className={"ms-Grid-col ms-md1"}>
              <div onClick={this.addReturnVia}>
                <IconButton 
                  iconProps={{ iconName: 'Add' }} 
                  ariaLabel="Add Via" 
                />
              </div>
            </div>
          </div>
          {this.state.viaReturn.map((vd,index)=> (<div>
            <div className={"ms-Grid-row "+ styles.rowSpacing}>
              <div className={"ms-Grid-col ms-md3 ms-textAlignRight"}> Via {index+1}:</div>
              <div className={"ms-Grid-col ms-md5"}>   
                <ComboBox 
                  selectedKey={vd.id}
                  placeholder="Select place or type it"
                  allowFreeform
                  autoComplete="on"
                  options={this.airports}
                />
              </div>          
              <div className={"ms-Grid-col ms-md1"}>   
                Nights:
              </div>
              <div className={"ms-Grid-col ms-md2"}>   
                <TextField value={vd.nightsToStay+""} />
              </div>
              <div className={"ms-Grid-col ms-md1"}>             
                <div onClick={()=>{this.removeReturnVia(index)}}>   
                  <IconButton iconProps={{ iconName: 'Cancel' }} ariaLabel="Remove Via" />
                </div>
              </div>
            </div>
          </div>))}
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Place of return to EU:</div>
            <div className={"ms-Grid-col ms-md8"}>  
              <ComboBox               
                placeholder="Select place or type it"
                allowFreeform
                autoComplete="on"
                options={this.airports}
              />
              </div> 
          </div>
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Number of DEPA</div>
            <div className={"ms-Grid-col ms-md8"}>        
              <TextField defaultValue="0"/>
            </div> 
          </div>
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Staff</div>
            <div className={"ms-Grid-col ms-md2"}>Escorts:</div> 
            <div className={"ms-Grid-col ms-md2"}>Medical:</div> 
            <div className={"ms-Grid-col ms-md2"}>Monitors:</div> 
            <div className={"ms-Grid-col ms-md2"}>Interpreters:</div>  
          </div>         
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>     
            </div>
            <div className={"ms-Grid-col ms-md2"}>     
              <TextField defaultValue="0"/>
            </div> 
            <div className={"ms-Grid-col ms-md2"}>     
              <TextField defaultValue="0"/>
            </div> 
            <div className={"ms-Grid-col ms-md2"}>     
              <TextField defaultValue="0"/>
            </div> 
            <div className={"ms-Grid-col ms-md2"}>     
              <TextField defaultValue="0"/>
            </div>  
          </div>
          
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Reference number</div>
            <div className={"ms-Grid-col ms-md8"}>  
              <TextField/>
            </div> 
            <div className={"ms-Grid-col ms-md1 "+styles.infoIcon} title="Reference number to external systems data">        
              <Icon 
                iconName="Info" className={styles.infoIcon}/>
            </div>
          </div>

          
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <div className={"ms-Grid-col ms-md3"}>Remarks</div>
            <div className={"ms-Grid-col ms-md8"}>        
              <TextField multiline />
            </div> 
          </div>

          
          <div className={"ms-Grid-row "+ styles.rowSpacing}>
            <Comments
              commentsList={this.commentsContent} 
              currentUser={"Jan Kowalski"}/>
          </div>
          
        </div>
        <div id={"footer-data"} className={styles.footer}>
          <div className={"ms-Grid-row "+styles.contentRight}>        
            <PrimaryButton
              className={styles.yellowBtn}
              data-automation-id="Draft" 
              disabled={false}
              checked={false}
              text="Save as draft"                    
            />      
            <PrimaryButton
              className={styles.greenBtn}
              data-automation-id="Request Offers" 
              disabled={false}
              checked={false}
              text="Request Offers"
            />  
          </div>
        </div>
      </div>
    );
    
  }
 
}
