import css from './Responses.module.css'
import { useParams } from 'react-router-dom';
import { useGetFormQuery, useGetResponsesQuery } from '../../api/generated';

const Responses = () => {
  
  const { id } = useParams<{ id: string }>();
  
  const { data: formData } = useGetFormQuery({ id: id || '' }, { skip: !id });
    
  const { data: responsesData, isLoading, error } = useGetResponsesQuery({ formId: id || '' }); 
      

if (isLoading) return (
  <div className={css.container}>
    <div className={`${css.statusMessage} ${css.loading}`}>Loading responses</div>
  </div>
);

if (error) return (
  <div className={css.container}>
    <div className={`${css.statusMessage} ${css.error}`}>
      Error: Failed to load responses. Please check server connection.
    </div>
  </div>
);

if (!formData?.form) return (
  <div className={css.container}>
    <div className={css.statusMessage}>Responses not found (Form ID is invalid)</div>
  </div>
);

if (!responsesData?.responses || responsesData.responses.length === 0) {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Responses for: {formData.form.title}</h1>
      <div className={css.statusMessage}>No responses yet. Be the first to fill it out!</div>
    </div>
  );
}

return (
  <div className={css.container}>
    <h1 className={css.title}>Responses for: {formData.form.title}</h1>
    <p className={css.description}>{formData.form.description}</p>

    <div className={css.responsesList}>
      {responsesData.responses.map((response, index) => (
        <div key={response.id} className={css.responseCard}>
          <h2 className={css.responseNumber}>Submission #{index + 1}</h2>
          
          <div className={css.answersGrid}>
            {response.answers?.filter(Boolean).map((ans) => {
              const question = formData?.form?.questions?.find(q => q?.id === ans!.questionId);
              
              return (
                <div key={ans!.questionId} className={css.answerItem}>
                  <p className={css.questionText}>
                    {question?.text || `Question ${ans!.questionId}`}
                  </p>
              <p className={css.answerValue}>
                 {ans!.value} 
              </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};


export default Responses;