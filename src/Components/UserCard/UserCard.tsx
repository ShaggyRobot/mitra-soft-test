import { IUser } from "../../Api/api";

interface IProps{
  user: IUser
}

function UserCard({user}: IProps): JSX.Element {
  return (
    <div>
      <h1>UserCard</h1>
    </div>
  );
}
export { UserCard };
