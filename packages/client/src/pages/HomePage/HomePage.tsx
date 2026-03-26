import { Link } from 'react-router-dom';
import { useGetFormsQuery } from '../../api/generated';
import css from './HomePage.module.css';

const HomePage = () => {
  const { data, isLoading, isError } = useGetFormsQuery();

 if (isLoading) {
    return (
      <div className={css.container}>
        <div className={`${css.statusMessage} ${css.loading}`}>Loading forms</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={css.container}>
        <div className={`${css.statusMessage} ${css.error}`}>
          Error loading forms. Please check if the backend server is running.
        </div>
      </div>
    );
  }

  if (!data?.forms || data.forms.length === 0) {
    return (
      <div className={css.container}>
        <div className={css.statusMessage}>
          <p>No forms created yet.</p>
          <Link to="/forms/new" className={css.createLink}>Create your first form</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1>My Forms</h1>
      </div>

      <div className={css.grid}>
        {data?.forms.map((form) => (
          <div key={form.id} className={css.card}>
            <h3 className={css.cardTitle}>{form.title}</h3>
            <p className={css.cardDesc}>
              {form.description || 'No description provided'}
            </p>
            
            <div className={css.actions}>
              <Link to={`/forms/${form.id}/fill`} className={css.link}>
                Fill Form
              </Link>
              <Link to={`/forms/${form.id}/responses`} className={css.link}>
                Responses
              </Link>
            </div>
          </div>
        ))}

        {data?.forms.length === 0 && (
          <p className={css.notFoundText}>No forms found. Create your first one!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;