import * as React from 'react'; 
import { INewROProps } from './INewRO';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import styles from './NewRO.module.scss' 
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { DateTimePickerSettings } from '../Statics/DateTimePickerSettings';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
////README!!!////
//To Trigger this panel you can use this code from console:
//event = new CustomEvent('ROactionDEPA');
//event.initEvent('ROactionDEPA',true,true);
//document.dispatchEvent(event);

export default class NewRO extends React.Component<INewROProps, {}> {

  constructor(data:INewROProps){
    super(data);
  }
  
  dateSettings:DateTimePickerSettings = new DateTimePickerSettings();
  
  public render(): React.ReactElement<INewROProps> {

    return (              
      <div className={"ms-Grid"} dir="ltr">
        <div className={"ms-Grid-row"}>        
          <div className={"ms-Grid-col ms-md2"}>Status:</div>
          <div className={"ms-Grid-col ms-md4"}>NEW</div>
        </div>
        <br/>
        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2"}>Operation Date:*</div>
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
        <br/>      
        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2"}>Place of departure:*</div>
          <div className={"ms-Grid-col ms-md8"}>          
            <Dropdown
              placeholder="Place of departure"
              options={[
                { key: 'Poland', text: 'Poland', itemType: DropdownMenuItemType.Header },
                { key: '1', text: 'Poland :: Warsaw :: Chopin' },
                { key: '2', text: 'Poland :: Cracow :: Wawel' },
                { key: 'France', text: 'France', itemType: DropdownMenuItemType.Header },
                { key: '3', text: 'France :: Paris :: de\'Gaulle' }
              ]}
            />
          </div>
          <div className={"ms-Grid-col ms-md2"}>
            <PrimaryButton
              data-automation-id="test" 
              text="Add Via" 
            />
          </div>
        </div>
        
        <br/>
        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2 ms-textAlignRight"}>Via 1:</div>
          <div className={"ms-Grid-col ms-md8"}>         
            <Dropdown
              placeholder="Place of departure"
              options={[
                { key: 'Poland', text: 'Poland', itemType: DropdownMenuItemType.Header },
                { key: '1', text: 'Poland :: Warsaw :: Chopin' },
                { key: '2', text: 'Poland :: Cracow :: Wawel' },
                { key: 'France', text: 'France', itemType: DropdownMenuItemType.Header },
                { key: '3', text: 'France :: Paris :: de\'Gaulle' }
              ]}
            /></div>
          <div className={"ms-Grid-col ms-md2"}>          
            <PrimaryButton
                data-automation-id="test" 
                text="Remove Via" />
          </div>
        </div>

        <br/>
        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2"}>Place of destination:*</div>
          <div className={"ms-Grid-col ms-md8"}>         
            <Dropdown
              placeholder="Place of departure"
              options={[
                { key: 'Poland', text: 'Poland', itemType: DropdownMenuItemType.Header },
                { key: '1', text: 'Poland :: Warsaw :: Chopin' },
                { key: '2', text: 'Poland :: Cracow :: Wawel' },
                { key: 'France', text: 'France', itemType: DropdownMenuItemType.Header },
                { key: '3', text: 'France :: Paris :: de\'Gaulle' }
              ]}
            /></div>
          <div className={"ms-Grid-col ms-md2"}>
            <PrimaryButton
              data-automation-id="test" 
              text="Add Via" />
          </div>
        </div>

        <br/>
        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2 ms-textAlignRight"}> Via 1:</div>
          <div className={"ms-Grid-col ms-md8"}>         
            <Dropdown
              placeholder="Place of departure"
              options={[
                { key: 'Poland', text: 'Poland', itemType: DropdownMenuItemType.Header },
                { key: '1', text: 'Poland :: Warsaw :: Chopin' },
                { key: '2', text: 'Poland :: Cracow :: Wawel' },
                { key: 'France', text: 'France', itemType: DropdownMenuItemType.Header },
                { key: '3', text: 'France :: Paris :: de\'Gaulle' }
              ]}
            />
          </div>
          <div className={"ms-Grid-col ms-md2"}>          
          <PrimaryButton
              data-automation-id="test" 
              text="Remove Via" /></div>
        </div>

        <br/>

        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2"}>Place of return to EU:</div>
          <div className={"ms-Grid-col ms-md8"}>         
            <Dropdown
              placeholder="Place of departure"
              options={[
                { key: 'Poland', text: 'Poland', itemType: DropdownMenuItemType.Header },
                { key: '1', text: 'Poland :: Warsaw :: Chopin' },
                { key: '2', text: 'Poland :: Cracow :: Wawel' },
                { key: 'France', text: 'France', itemType: DropdownMenuItemType.Header },
                { key: '3', text: 'France :: Paris :: de\'Gaulle' }
              ]}
            /></div> 
        </div>

        <br/>
        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2"}>Number of DEPA</div>
          <div className={"ms-Grid-col ms-md8"}>#numberinputhere#</div> 
        </div>

        <br/>
        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2"}>Staff</div>
          <div className={"ms-Grid-col ms-md2"}>Escorts</div> 
          <div className={"ms-Grid-col ms-md2"}>Medical</div> 
          <div className={"ms-Grid-col ms-md2"}>Monitors</div> 
          <div className={"ms-Grid-col ms-md2"}>Interpreters</div>  
        </div>

        <br/>

        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2"}>Reference number</div>
          <div className={"ms-Grid-col ms-md8"}>#textfield#</div> 
          <div className={"ms-Grid-col ms-md2"}>#infoIcon#</div>
        </div>

        <br/>
        <div className={"ms-Grid-row"}>
          <div className={"ms-Grid-col ms-md2"}>Remarks</div>
          <div className={"ms-Grid-col ms-md8"}>#MultilinesText#</div> 
        </div>

        <br/>
        <span>Comments here.</span>

      </div>
    );
    
  }
 
}
