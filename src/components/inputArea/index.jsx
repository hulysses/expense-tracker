import { useState } from 'react';
import { newDateAdjusted } from '../../helpers/index';
import { auth } from '../../libs/firebase';
import './styles.css';

export default function InputArea({ categories, onAdd }) {
    const [dateField, setDateField] = useState('');
    const [categoryField, setCategoryField] = useState('');
    const [titleField, setTitleField] = useState('');
    const [valueField, setValueField] = useState(0);
    const user = auth.currentUser;

    const handleAddEvent = () => {
        let errors = [];

        if (isNaN(new Date(dateField).getTime())) {
            errors.push('Data inválida!');
        }
        if (!categories.some(cat => cat.title === categoryField)) {
            errors.push('Categoria inválida!');
        }
        if (titleField === '') {
            errors.push('Título vazio!');
        }
        if (valueField <= 0) {
            errors.push('Valor inválido!');
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
        } else {
            onAdd({
                idUser: user.uid,
                date: newDateAdjusted(dateField),
                category: categoryField,  // Usando o título da categoria diretamente
                title: titleField,
                value: valueField
            });
            clearFields();
        }
    }

    const clearFields = () => {
        setDateField('');
        setCategoryField('');
        setTitleField('');
        setValueField(0);
    }

    return (
        <div className="containerInput">
            <div className="inputLabel">
                <label className='inputTitle'>Data</label>
                <input className='input' type="date" value={dateField} onChange={e => setDateField(e.target.value)} />
            </div>
            <div className="inputLabel">
                <label className='inputTitle'>Categoria</label>
                <select
                    className='select'
                    value={categoryField}
                    onChange={e => setCategoryField(e.target.value)}
                >
                    <option value="">Selecione</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.title}> {/* Passando o título diretamente */}
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="inputLabel">
                <label className='inputTitle'>Título</label>
                <input className='input' type="text" value={titleField} onChange={e => setTitleField(e.target.value)} />
            </div>
            <div className="inputLabel">
                <label className='inputTitle'>Valor</label>
                <input className='input' type="number" value={valueField} onChange={e => setValueField(parseFloat(e.target.value))} />
            </div>
            <div className="inputLabel">
                <button className="buttonAdd" onClick={handleAddEvent}>Adicionar</button>
            </div>
        </div>
    );
}
