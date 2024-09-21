import './styles.css';
import { formatDate } from '../../helpers/index';

export default function TableItem({ item, categories }) {
    const category = categories.find(cat => cat.title === item.category);
    const valueColor = category && category.expense ? 'red' : 'green';

    return (
        <tr>
            <td className='td'>{formatDate(item.date)}</td>
            <td className='td' style={{ color: category ? category.color : 'black' }}>
                <div className='divCategory'
                    style={{ backgroundColor: category ? category.color : '#000' }}>
                    {category ? category.title : 'Desconhecida'}
                </div>
            </td>
            <td className='td'>{item.title}</td>
            <td className='td' style={{ color: valueColor }}>
                R$ {item.value.toFixed(2)}
            </td>
        </tr>
    );
}
