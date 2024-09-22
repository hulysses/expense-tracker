import { useState, useEffect } from 'react';
import './styles.css'
import NavBar from '../../components/navBar';
import { Item } from '../../entities/items';
import { Category } from '../../entities/categories';
import { getCurrentMonth, filterListByMonth } from '../../helpers/index';
import TableArea from '../../components/tableArea';
import InforArea from '../../components/inforArea';

export default function Dashboard() {
    const [list, setList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        setFilteredList(filterListByMonth(list, currentMonth));
    }, [list, currentMonth]);

    useEffect(() => {
        const itemList = [
            new Item(1, new Date(2024, 8, 21), 'Alimentação', 'Groceries', 105.50),
            new Item(2, new Date(2024, 8, 22), 'Transporte', 'Bus fare', 2.75)
        ];

        setList(itemList);
    }, []);

    useEffect(() => {
        const categoryList = [
            new Category('Alimentação', 'red', true),
            new Category('Transporte', 'blue', true),
            new Category('Utilidades', 'brown', true),
            new Category('Saúde', '#ff4500', true),
            new Category('Salário', 'green', false),
            new Category('Outros', 'purple', true)
        ];

        setCategories(categoryList);
    }, []);

    useEffect(() => {
        let incomeCount = 0;
        let expenseCount = 0;

        for (let i in filteredList) {
            const category = categories.find(cat => cat.title === filteredList[i].category);

            if (category && category.expense) {
                expenseCount += filteredList[i].value;
            } else if (category) {
                incomeCount += filteredList[i].value;
            }
        }

        setIncome(incomeCount);
        setExpense(expenseCount);
    }, [filteredList, categories]);

    const handleMonthChange = (newMonth) => {
        setCurrentMonth(newMonth);
    }

    return (
        <div>
            <NavBar />
            <div className='body'>
                <InforArea
                    currentMonth={currentMonth}
                    onMonthChange={handleMonthChange}
                    income={income}
                    expense={expense}
                />
                <TableArea items={filteredList} categories={categories} />
            </div>
        </div>
    );
}