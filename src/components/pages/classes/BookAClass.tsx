'use client';

import Calendar from './Calendar';

const BookAClass = () => {
  return (
    <div className="pt-2">
      <h1 className="font-engravers text-center text-4xl font-semibold">Clases 1 a 1</h1>
      <p className="mt-4 text-center text-lg">Reserva una clase de una hora conmigo</p>

      <div className="mt-10 flex flex-col items-center justify-center">
        <Calendar />
      </div>
    </div>
  );
};

export default BookAClass;
