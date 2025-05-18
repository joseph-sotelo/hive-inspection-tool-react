import { Link } from "react-router-dom";

export default function Clients({ clients }: {clients: string[] }) {
    return (
        <ul >
            {clients.map((value, index) => (
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