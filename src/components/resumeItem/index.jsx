import './styles.css'

export default function ResumeItem({ title, value, color }) {
    const textColor = color ? (value <= 0 ? 'red' : 'green') : 'black';

    return (
        <div className="resumeContainer">
            <div className="title">{title}</div>
            <div className="info" style={{ color: textColor }}>R$ {value}</div>
        </div>
    );
}