import { useState, useEffect } from 'react';
import './styles.css'
import NavBar from '../../components/navBar';
import { Item } from '../../entities/items';  // Supondo que Item é uma classe ou estrutura definida
import { Category } from '../../entities/categories';
import { getCurrentMonth, filterListByMonth } from '../../helpers/index';
import TableArea from '../../components/tableArea';
import InforArea from '../../components/inforArea';
import InputArea from '../../components/inputArea';

export default function Dashboard() {
    const [list, setList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);

    useEffect(() => {
        const storedList = localStorage.getItem('list');
        const storedCategories = localStorage.getItem('categories');

        if (storedList) {
            const parsedList = JSON.parse(storedList);
            const listWithDates = parsedList.map(item => ({
                ...item,
                date: new Date(item.date)
            }));

            setList(listWithDates);
        }

        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        }
    }, []);

    useEffect(() => {
        if (list.length > 0) {
            localStorage.setItem('list', JSON.stringify(list));
        }
    }, [list]);

    useEffect(() => {
        if (categories.length > 0) {
            localStorage.setItem('categories', JSON.stringify(categories));
        }
    }, [categories]);

    useEffect(() => {
        setFilteredList(filterListByMonth(list, currentMonth));
    }, [list, currentMonth]);

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

    const handleAddItem = (item) => {
        const newList = [...list, item];
        setList(newList);
    };

    const handleMonthChange = (newMonth) => {
        setCurrentMonth(newMonth);
    };

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
                <InputArea categories={categories} onAdd={handleAddItem} />
                <TableArea items={filteredList} categories={categories} />
            </div>4
        </div>
    );
}
