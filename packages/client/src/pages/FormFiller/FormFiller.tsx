import css from './FormFiller.module.css'
import { useParams, useNavigate } from 'react-router-dom';
import { useGetFormQuery, useSubmitResponseMutation } from '../../api/generated';
import { useState } from 'react';

const FormFiller = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [submitForm, { isLoading: isSubmitting }] = useSubmitResponseMutation();
 
 
  const { data, isLoading, error } = useGetFormQuery({ id: id || '' },
    { skip: !id });

 if (isLoading) return (
  <div className={`${css.statusMessage} ${css.loading}`}>
    Loading form
  </div>
);
  if (error) return (
  <div className={`${css.statusMessage} ${css.error}`}>
    Error: Failed to load form
  </div>
);

if (!data?.form) return (
  <div className={css.statusMessage}>
    Form not found
  </div>
  );
  
  const handleInputChange = (questionId: string, value: string | string[]) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const questionIds = data.form?.questions?.filter(Boolean).map(q => q!.id) || [];

  const allAnswered = questionIds.every(id => {
    const answer = responses[id];
    if (Array.isArray(answer)) return answer.length > 0; 
    return answer !== undefined && String(answer).trim() !== ''; 
  });

  if (!allAnswered) {
    alert('Please answer all questions before submitting.');
    return;
  }
  
    const formattedAnswers = Object.entries(responses).map(([questionId, value]) => ({
      questionId,
      value: Array.isArray(value) ? value.join(', ') : String(value)
    }));

    try {
      await submitForm({
        formId: id!,
        answers: formattedAnswers
      }).unwrap();
      alert('Form submitted successfully!');
      navigate('/')
    } catch {
      alert('Error submitting form');
    }
  };

  return (
    <div className={css.container}>
      <div className={css.formHeader}>
        <h1 className={css.title}>{data.form.title}</h1>
        <p className={css.description}>{data.form.description}</p>
      </div>
      
      <form className={css.fillForm} onSubmit={handleSubmit}>
        <div className={css.questionsList}>
          {data.form.questions?.filter(Boolean).map((q) => (
            <div key={q!.id} className={css.questionCard}>
              <p className={css.questionText}>{q!.text}</p>

              <div className={css.answerSection}>
                {q!.type === 'TEXT' && (
                  <input
                    type="text"
                    placeholder="Your answer"
                    className={css.textInput}
                    value={responses[q!.id] || ''}
                    onChange={(e) => handleInputChange(q!.id, e.target.value)}
                  />
                )}

                {q!.type === 'DATE' && (
                  <input
                    type="date"
                    className={css.dateInput}
                    value={responses[q!.id] || ''}
                    onChange={(e) => handleInputChange(q!.id, e.target.value)}
                  />
                )}

                {(q!.type === 'MULTIPLE_CHOICE' || q!.type === 'CHECKBOX') && (
                  <div className={css.optionsList}>
                    {q!.options?.filter(Boolean).map((opt, i) => (
                      <label key={i} className={css.optionLabel}>
                        <input
                          type={q!.type === 'MULTIPLE_CHOICE' ? "radio" : "checkbox"}
                          className={css.realInput}
                          name={q!.id}
                          checked={q!.type === 'MULTIPLE_CHOICE'
                            ? responses[q!.id] === opt
                            : (responses[q!.id] as string[] || []).includes(opt!)}
                          onChange={(e) => {
                            if (q!.type === 'MULTIPLE_CHOICE') {
                              handleInputChange(q!.id, opt!);
                            } else {
                              const current = responses[q!.id] as string[] || [];
                              const next = e.target.checked
                                ? [...current, opt!]
                                : current.filter(a => a !== opt!);
                              handleInputChange(q!.id, next);
                            }
                          }}
                        />
                        <span className={css.optionText}>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
    
        <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};
export default FormFiller;