import { IComment } from '../../Api/api';

interface IProps {
  comment: IComment;
}

function PostComment({ comment }: IProps): JSX.Element {
  return (
    <div className='mb-3' style={{fontSize: '.9rem'}}>
      <span className='fw-bold'>{comment.email}: </span>
      <span>{comment.body}</span>
    </div>
  );
}
export { PostComment };
