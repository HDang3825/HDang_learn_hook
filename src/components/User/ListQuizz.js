import { useEffect, useState } from "react";
import { getQuizzByUser } from "../../services/apiServices";
import './ListQuizz.scss'
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
const ListQuizz = () => {
    const { t } = useTranslation();
    const [arrQuizz, setArrQuizz] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getQuizzData();
    }, []);
    const getQuizzData = async () => {
        const res = await getQuizzByUser()
        if (res && res.EC === 0) {
            setArrQuizz(res.DT)
        }
    }
    return (
        <div className="list-quizz-container container">
            {arrQuizz && arrQuizz.length > 0 &&
                arrQuizz.map((item, index) => {
                    return (
                        <div key={`arrQuizz-${index}`} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{t('users.title1')} {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button onClick={() => navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } })} className="btn btn-primary ">{t('users.title2')}</button>
                            </div>
                        </div>
                    )
                })
            }
            {arrQuizz && arrQuizz.length === 0 &&
                <div className="text-center w-100 fs-4">
                    {t('users.title3')}
                </div>
            }
        </div>
    )
}
export default ListQuizz;