import { Link } from "react-router-dom";

export default function PowerPlants({ types }: {types: string[] }) {
    return (
        <ul >
            {types.map((value, index) => (
                <li key = {`${value}-${index}`}
                >
                    <Link to={`/map/${value}`}>
                        {value}
                    </Link>
                </li>
            ))}
        </ul>
    );
}