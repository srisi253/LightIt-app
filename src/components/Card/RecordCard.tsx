import { Link } from "react-router-dom";
import { MedicalRecord } from "../../models/record";
import "./RecordCard.scss"

export const RecordCard = ({ record } : {record: MedicalRecord}) => {
    const {name, avatar, id} = record || {};

    return(
        <article>
            <Link to={`./${id}`}>
                    <h2>{name}</h2>
                    <img src={avatar} alt="avatar" />

            </Link>
            {/* TODO poner link todo el article/adaptar scss */}
        </article>
    )
}