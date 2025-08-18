import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const PrivacyPolicy = () => {
  return (
    <Card className="mx-auto max-w-3xl p-4 pt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Política de Privacidad</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="prose prose-p:leading-relaxed max-w-none">
        <ScrollArea className="h-[600px pr-4">
          <p>
            <strong>En Sonic Art Lab</strong>, nos comprometemos a proteger la privacidad de
            nuestros usuarios. Esta política explica cómo recolectamos, utilizamos y protegemos tu
            información personal.
          </p>

          <p>
            <strong>Información Recopilada</strong>
          </p>
          <p>Recopilamos los siguientes datos personales:</p>
          <ul>
            <li>Nombre</li>
            <li>Correo electrónico</li>
          </ul>
          <p>
            Los datos de pago son procesados exclusivamente por PayPal, quienes cumplen con los
            estándares de seguridad más estrictos.
          </p>

          <p>
            <strong>Uso de la Información</strong>
          </p>
          <p>Utilizamos los datos proporcionados para:</p>
          <ul>
            <li>Procesar pagos y completar transacciones.</li>
            <li>Enviar boletines informativos, promociones y contenido personalizado.</li>
            <li>Mejorar la experiencia del usuario en nuestro sitio.</li>
          </ul>

          <p>
            <strong>Compartir Datos con Terceros</strong>
          </p>
          <p>
            Sonic Art Lab no comparte tu información personal con ningún tercero, excepto con
            PayPal, nuestra plataforma de pagos, para gestionar el procesamiento de pagos de manera
            segura.
          </p>

          <p>
            <strong>Derechos de los Usuarios</strong>
          </p>
          <p>
            Tenés el derecho de acceder, corregir o eliminar tus datos personales. Si deseás
            eliminar tu cuenta o los datos asociados, podés hacerlo en cualquier momento. Si tenés
            alguna consulta, no dudes en contactarnos.
          </p>

          <p>
            <strong>Seguridad de los Datos</strong>
          </p>
          <p>
            Protegeremos tu información personal con la última tecnología en seguridad de datos.
            Implementamos medidas de seguridad adecuadas para evitar el acceso no autorizado o la
            divulgación de tu información.
          </p>

          <p>
            <strong>Actualización de la Política</strong>
          </p>
          <p>
            Nos reservamos el derecho de actualizar esta política en cualquier momento. Cualquier
            cambio será publicado en esta página.
          </p>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicy;
