import './styles.css'
import TableItem from '../tableItem';

export default function TableArea({ items, categories }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th className='th' width={100}>Data</th>
                    <th className='th' width={130}>Categoria</th>
                    <th className='th'>Título</th>
                    <th className='th' width={150}>Valor</th>
                </tr>
            </thead>
            <tbody>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <TableItem key={index} item={item} categories={categories} />
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className='td'>Nenhum item encontrado</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}