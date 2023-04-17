import { useState } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';


const Calendario = ({ reservationDate, setReservationDate, deadline, setDeadline }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleReservationDateChange = (date, dateString) => {
    setReservationDate(dateString);
  };

  const handleDeadlineChange = (date, dateString) => {
    setDeadline(dateString);
  };

  return (
    <div className="calendario">
      <span direction="vertical" size={12}>
        <DatePicker
          value={reservationDate ? moment(reservationDate, 'YYYY-MM-DD') : null}
          onChange={handleReservationDateChange}
          placeholder="Fecha de reserva"
          inputVariant="standard"
        />
        <DatePicker
          value={deadline ? moment(deadline, 'YYYY-MM-DD') : null}
          onChange={handleDeadlineChange}
          placeholder="Fecha Devolucion"
          inputVariant="standard"
        />
      </span>
    </div>
  );
};

export default Calendario;
