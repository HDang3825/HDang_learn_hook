import "./DashBoard.scss"
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverView } from "../../../services/apiServices";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
const DashBoard = (props) => {
    const { t } = useTranslation();
    const [dataOverView, setDataOverView] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const fetchDataOverView = async () => {
        let res = await getOverView();
        if (res && res.EC === 0) {
            setDataOverView(res.DT)
            let Qz, Qs, As = 0;
            Qz = res?.DT?.others?.countQuiz ?? 0;
            Qs = res?.DT?.others?.countQuestions ?? 0;
            As = res?.DT?.others?.countAnswers ?? 0;
            const data = [
                {
                    name: "Quizzes",
                    value: Qz
                },
                {
                    name: "Question",
                    value: Qs,
                },
                {
                    name: "Answer",
                    value: As,
                },
            ]
            setDataChart(data)
        }
    }
    useEffect(() => {
        fetchDataOverView();
    }, [])

    console.log(dataOverView)
    return (
        <div className="dashboard-container">
            <div className="title">
                {t('dashboard.title1')}
            </div>
            <div className="content">
                <div className="c-left">
                    <div className="child">
                        <span className="text1"> {t('dashboard.title2')}</span>
                        <span className="text2">
                            {dataOverView && dataOverView.users && dataOverView.users.total ?
                                <>{dataOverView.users.total}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text1"> {t('dashboard.title3')}</span>
                        <span className="text2">
                            {dataOverView && dataOverView.others && dataOverView.others.countQuiz ?
                                <>{dataOverView.others.countQuiz}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text1"> {t('dashboard.title4')}</span>
                        <span className="text2">
                            {dataOverView && dataOverView.others && dataOverView.others.countQuestions ?
                                <>{dataOverView.others.countQuestions}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className="text1"> {t('dashboard.title5')}</span>
                        <span className="text2">
                            {dataOverView && dataOverView.others && dataOverView.others.countAnswers ?
                                <>{dataOverView.others.countAnswers}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className="c-right">
                    <h4 style={{ textAlign: 'center' }}>{t('dashboard.title6')}</h4>
                    <ResponsiveContainer width='100%' height="92%" >
                        <BarChart data={dataChart} barCategoryGap="30%" barGap={0} >
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Bar dataKey="value" fill="#ade" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
export default DashBoard;