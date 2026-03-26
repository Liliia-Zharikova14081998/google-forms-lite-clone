import { useState } from 'react';
import { useCreateFormMutation } from '../../api/generated'; 
import type { QuestionType, QuestionInput } from '../../api/generated';
import css from './CreateForm.module.css';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<QuestionInput[]>([
    { text: '', type: 'TEXT' as QuestionType, options: [] }
  ]);

  const [createForm, { isLoading }] = useCreateFormMutation();

  const addQuestion = () => {
    setQuestions([...questions, { text: '', type: 'TEXT' as QuestionType, options: [] }]);
  };

  const handleSave = async () => {
  
  if (!title.trim()) {
    alert('Please enter a form title');
    return; 
  }

  if (questions.length === 0) {
    alert('Please add at least one question');
    return;
  }

  const hasEmptyQuestions = questions.some(q => !q.text.trim());
  if (hasEmptyQuestions) {
    alert('Please fill in all question texts');
    return;
  }

  try {
    await createForm({
      title: title.trim(),
      description: description.trim(),
      questions
    }).unwrap();
    alert('Form saved successfully!');
    navigate('/');
  } catch {
    alert('Failed to save form. Please try again.');
  }
};

    return (
      <div className={css.container} >
        <div className={css.formHeader}>
          <input 
        className={css.titleInput}
        type="text" 
        placeholder="Form Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
          <input 
            className={css.formInput}
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
</div>
      <div className={css.questionsList}>
        {questions.map((q, index) => (
          <div key={index} className={css.questionCard}>
            <div className={css.questionRow}>
            <input 
              className={css.formInput}
              type="text" 
              placeholder="Question Text" 
              value={q.text}
              onChange={(e) => {
                const newQs = [...questions];
                newQs[index].text = e.target.value;
                setQuestions(newQs);
              }}
            />
            
            <select 
              className={css.selectType}
              value={q.type} 
              onChange={(e) => {
                const newQs = [...questions];
                newQs[index].type = e.target.value as QuestionType;
                setQuestions(newQs);
              }}
            >
                
              <option className={css.formOption} value="TEXT">Short Answer</option>
              <option className={css.formOption} value="MULTIPLE_CHOICE">Multiple Choice</option>
              <option className={css.formOption} value="CHECKBOX">Checkboxes</option>
              <option className={css.formOption} value="DATE">Date</option>
                </select>
            </div>
            
                {(q.type === 'MULTIPLE_CHOICE' || q.type === 'CHECKBOX') && (
  <div className={css.optionsContainer}>
    {q.options?.map((option, optIndex) => (
      <div key={optIndex} className={css.optionItem}>
        <input
          className={css.formInput}
          type="text"
          placeholder={`Option ${optIndex + 1}`}
          value={option || ''}
          onChange={(e) => {
            const newQs = [...questions];
            const newOpts = [...(newQs[index].options || [])];
            newOpts[optIndex] = e.target.value;
            newQs[index].options = newOpts;
            setQuestions(newQs);
          }}
        />
        <button 
          className={`${css.removeBtn} button`}
          type="button" 
          onClick={() => {
            const newQs = [...questions];
            newQs[index].options = newQs[index].options?.filter((_, i) => i !== optIndex);
            setQuestions(newQs);
          }}
        >
          Remove
        </button>
      </div>
    ))}
    
    <button
      type="button"
      className={`${css.addOptionBtn} button`}
      onClick={() => {
        const newQs = [...questions];
        newQs[index].options = [...(newQs[index].options || []), ''];
        setQuestions(newQs);
      }}
    >
      + Add Option
    </button>
  </div>
)}
          </div>
        ))}
      </div>

      <button className={`${css.addQuestionBtn} button`} onClick={addQuestion}>+ Add Question</button>
      <button className={`${css.saveBtn} button`} onClick={handleSave} disabled={isLoading}>Save Form</button>
            </div>
             
  );
};

export default CreateForm;