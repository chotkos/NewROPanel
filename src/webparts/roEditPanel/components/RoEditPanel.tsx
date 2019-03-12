import * as React from 'react';
import styles from './RoEditPanel.module.scss';
import { IRoEditPanelProps } from './IRoEditPanelProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import NewRO from './NewRO/NewRO';


export interface IPanelLargeExampleState {
  showPanel: boolean;
  type?: string,
  id?: string
}

////README!!!////
//To Trigger this panel you can use this code from console:
//event = new CustomEvent('ROactionDEPA');
//event.initEvent('ROactionDEPA',true,true);
//document.dispatchEvent(event);

export default class RoEditPanel extends React.Component<IRoEditPanelProps, IPanelLargeExampleState> {

  constructor(data:IRoEditPanelProps){
    super(data);

    this.state = {
      showPanel : false,
      type: null,
      id: null //@TODO: Needs to be loaded from event
    };

  }
  
  
  public render(): React.ReactElement<IRoEditPanelProps> {

    document.addEventListener('ROactionDEPU',(e)=>{
      this.setState({showPanel:true, type:'DEPU'});
    });

    document.addEventListener('ROactionVolontary',(e)=>{
      this.setState({showPanel:true, type:'Volontary'});
    });

    
    document.addEventListener('ROactionDEPA',(e)=>{
      this.setState({showPanel:true, type:'DEPA'});
    });

    return (      
        
        <Panel 
          isOpen={this.state.showPanel}
          onDismiss={this._hidePanel}
          type={PanelType.large}
          headerText="Return Operation"> 

          {this.state.id==null && this.state.type!=null && 
            <NewRO 
              type={this.state.type} 
              id={this.state.id}>
            </NewRO>
          }

        </Panel> 
    );
    
  }


  
  private _hidePanel = () => {
    this.setState({ showPanel: false, type:null, id:null });
  };

  private _showPanel = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ showPanel: true });
  };
}
