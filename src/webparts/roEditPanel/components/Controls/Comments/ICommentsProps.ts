export interface ICommentsProps {
  commentsList: Array<any>
  currentComment? :string;
  currentUser : string,  
  onAddBtn?: ((commentData:any)=> void),
}
