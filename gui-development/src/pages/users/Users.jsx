import { Link, useParams } from "react-router-dom";
import { SecondaryButton } from "../../components/button/Button";
import uppercaseFirstLetter from "../../util/text/uppercaseFirstLetter";

export default function Users({ ...props }) {
  const { role } = useParams();
  return (
    <div {...props}>
      <div className="flex justify-between items-center border-b-2 mb-3 pb-2">
        <h2 className="text-2xl font-lato font-semibold">
          {uppercaseFirstLetter(role)}
        </h2>
        <SecondaryButton>
          <Link to="/school/add">Add new</Link>
        </SecondaryButton>
      </div>
    </div>
  );
}
