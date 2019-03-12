import * as React from 'react';
import styles from './Comments.module.scss';
import './List.Basic.Example.scss';

import { ICommentsProps } from './ICommentsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton, PrimaryButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { getRTL } from 'office-ui-fabric-react/lib/Utilities';
import { List } from 'office-ui-fabric-react/lib/List';

export default class Comments extends React.Component<ICommentsProps, any> {


  constructor(props:ICommentsProps){
    super(props);
    this.state = {...this.props, showComments:false};

    this._onRenderCell = this._onRenderCell.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
  }

  public handleAddClick(){
    if(this.state.currentComment)
    {
      let comment = { 
        name: this.props.currentUser, 
        description: this.state.currentComment,
        created: (new Date()).toLocaleString('en-GB')
      }; 

      this.setState({
        commentsList : this.state.commentsList.concat([comment]),
        currentComment : ""
      });


      this.forceUpdate();
      if(this.props.onAddBtn){
        this.props.onAddBtn(comment);
      }
    } 
  }

  toggleComments(){
    this.setState({showComments: !this.state.showComments})
  }

  public render(): React.ReactElement<ICommentsProps> { 

    return (
      <div className={ styles.comments }>              
      <p className={ styles.sectionTitle } onClick={this.toggleComments}>
        <Icon 
          iconName={!this.state.showComments ? "ChevronDown":"ChevronUp"} 
          className={styles.sectionTitleIcon}/> 
        Comments
      </p>     
      {this.state.showComments && (  
        <div  className={"ms-Grid"}>
          <div className={"ms-Grid-row"}>             
            <div className={"ms-Grid-col ms-md10"}> 
              <TextField label="New comment" 
                multiline               
                onChanged={(e=> {this.setState({currentComment:e})}).bind(this)}
                value={this.state.currentComment}
              /> 
            </div>            
            <div className={"ms-Grid-col ms-md2"}>
              <PrimaryButton
                data-automation-id="Add" 
                disabled={false}
                checked={false}
                text="Add comment"         
                onMenuClick={this.handleAddClick}                           
                rootProps={{onClick:this.handleAddClick}}
                className={styles.pullRight+"  "+styles.addBtn}  
              />   
            </div>
          </div>
        </div> )} 
        {this.state.showComments && (  
        <List 
          items={this.state.commentsList} 
          onRenderCell={this._onRenderCell} 
        />)}
      </div>
    );
  }


  private _onRenderCell(item: any, index: number | undefined): JSX.Element {
    return (
      <div className="ms-ListBasicExample-itemCell" data-is-focusable={true}>
        <div className="ms-ListBasicExample-itemContent">
          <div className="ms-ListBasicExample-itemName">{item.name}</div>
          <div className="ms-ListBasicExample-itemIndex">{item.created}</div>
          <div className="ms-ListBasicExample-itemDesc">{item.description}</div>
        </div>
      </div>
    );
  }
}
