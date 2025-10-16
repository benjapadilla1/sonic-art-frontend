'use client';

import Link from 'next/link';
import Calendar from './Calendar';

const BookAClass = () => {
  const isUserLoggedIn = true;

  return (
    <div className="pt-2">
      <h1 className="text-center text-4xl font-semibold tracking-tight">Clases 1 a 1</h1>
      <p className="mt-4 text-center text-lg">Reserva una clase de una hora conmigo</p>

      <div className="flex flex-col items-center justify-center">
        {isUserLoggedIn ? (
          <Calendar />
        ) : (
          <p className="pb-8 text-center">
            Necesitas{' '}
            <Link className="text-blue-600 hover:underline" href="/acceso">
              Iniciar Sesión
            </Link>{' '}
            para reservar una clase 1 a 1
          </p>
        )}
      </div>
    </div>
  );
};

export default BookAClass;
