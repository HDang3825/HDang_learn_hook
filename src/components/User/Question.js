import _ from "lodash";

const Question = (props) => {
    const { data, index, handleCheck } = props;
    if (_.isEmpty(data)) {
        return (<></>)
    }
    const handleCheckBox = (event, aId, qId) => {
        handleCheck(aId, qId)
    }
    return (
        <>
            {data && data.image ?
                <div className="q-img">
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                </div>
                :
                <div className="q-img">
                </div>
            }

            <div className="question">
                Câu {index + 1}:  {data.questionDescription}?
            </div>
            <div className="answer">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((item, index) => {
                        return (
                            <div className="choose" key={`answer-${index}`}>
                                <div className="form-check" >
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        onChange={(event) => { handleCheckBox(event, item.id, data.questionId) }}
                                        checked={item.isSelected}
                                    />
                                    <label className="form-check-label">
                                        {item.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Question;