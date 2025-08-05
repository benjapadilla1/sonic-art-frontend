import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const TermsAndConditions = () => {
  return (
    <Card className="mx-auto max-w-3xl p-4 pt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Términos y Condiciones</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="prose prose-p:leading-relaxed max-w-none">
        <ScrollArea className="h-[600px] pr-4">
          <p>
            <strong>Introducción</strong>
          </p>
          <p>
            Bienvenido a Sonic Art. Al acceder y utilizar nuestros servicios, productos y contenido,
            aceptás los siguientes términos y condiciones. Te recomendamos leerlos cuidadosamente.
            Si no estás de acuerdo, por favor, no utilices nuestra web.
          </p>

          <p>
            <strong>Pagos y Seguridad</strong>
          </p>
          <p>
            Los pagos en nuestra plataforma son gestionados a través de Paddle, utilizando los
            últimos métodos de seguridad online disponibles para proteger tu información personal y
            financiera.
          </p>

          <p>
            <strong>Cuenta de Usuario</strong>
          </p>
          <p>
            Para realizar cualquier movimiento dentro de la web (compras, reservas de clases, acceso
            a cursos), es necesario crear una cuenta. Es tu responsabilidad mantener la seguridad de
            tu cuenta y toda actividad asociada a la misma.
          </p>

          <p>
            <strong>Protección de Datos Personales</strong>
          </p>
          <p>
            Sonic Art Lab se compromete a proteger tus datos personales de acuerdo con las
            normativas de privacidad vigentes. Los datos recabados serán utilizados exclusivamente
            para la gestión de compras, accesos a servicios y personalización de la experiencia en
            nuestra plataforma. Para más detalles, consultá nuestra Política de Privacidad.
          </p>

          <p>
            <strong>Uso de los Contenidos</strong>
          </p>
          <p>
            Los sample packs y otros productos adquiridos en Sonic Art Lab son para uso exclusivo
            del comprador. Los productos son inalienables e intransferibles a terceros. Los usuarios
            pueden utilizar los contenidos para proyectos personales y comerciales, pero no están
            autorizados a revender, redistribuir ni compartir los productos adquiridos.
          </p>

          <p>
            <strong>Política de Reembolso y Cancelación</strong>
          </p>
          <p>
            Nuestra política de reembolso del 100% es válida únicamente para cursos. Si no estás
            satisfecho con el contenido del curso, podrás solicitar un reembolso total dentro de los
            60 días posteriores a la compra. Para realizar el reembolso, contactanos a través de la
            sección de contacto en la web.
          </p>

          <p>
            <strong>Limitación de Responsabilidad</strong>
          </p>
          <p>
            Sonic Art Lab no se hace responsable de los daños indirectos, incidentales o
            consecuentes derivados del uso de nuestros productos y servicios. Nos comprometemos a
            proporcionar contenido de calidad, pero no garantizamos resultados específicos en cuanto
            a la aplicación de las enseñanzas en proyectos personales o comerciales.
          </p>

          <p>
            <strong>Modificación de Términos</strong>
          </p>
          <p>
            Sonic Art Lab se reserva el derecho de modificar estos Términos y Condiciones en
            cualquier momento. Las modificaciones serán efectivas una vez publicadas en la web, y se
            notificará a los usuarios registrados sobre cambios significativos.
          </p>

          <p>
            <strong>Ley Aplicable</strong>
          </p>
          <p>Este acuerdo se regirá e interpretará de acuerdo con las leyes de Argentina.</p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TermsAndConditions;
