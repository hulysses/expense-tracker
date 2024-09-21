import './styles.css';
import ArrowLeft from '../../assets/icons/arrowLeft.svg';
import ArrowRight from '../../assets/icons/arrowRight.svg';
import { formatCurrentMonth } from '../../helpers';
import ResumeItem from '../resumeItem';

export default function InforArea({ currentMonth, onMonthChange, income, expense }) {
  const handlePrevMonth = () => {
    let [year, month] = currentMonth.split('-');
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() - 1);
    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
  }

  const handleNextMonth = () => {
    let [year, month] = currentMonth.split('-');
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    currentDate.setMonth(currentDate.getMonth() + 1);
    onMonthChange(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
  }

  return (
    <div className='divContainer'>
      <div className="monthArea">
        <div className="monthArrow" onClick={handlePrevMonth}>
          <img src={ArrowLeft} alt="Seta para a esquerda" />
        </div>
        <div className="monthTitle">{formatCurrentMonth(currentMonth)}</div>
        <div className="monthArrow" onClick={handleNextMonth}>
          <img src={ArrowRight} alt="Seta para a esquerda" />
        </div>
      </div>
      <div className="resumeArea">
        <ResumeItem title='Receita' value={income} color={false}/>
        <ResumeItem title='Despesas' value={expense} color={false}/>
        <ResumeItem title='Balanço' value={income - expense} color={true}/>
      </div>
    </div>
  )
}