'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { uploadContactForm } from '@/functions/form/UploadContactForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Tu nombre debe tener más de 2 caracteres',
  }),
  email: z
    .string()
    .min(2, {
      message: 'Tu email debe tener más de 2 caracteres',
    })
    .email('Tu email debe ser válido'),
  message: z.string().min(2, {
    message: 'Tu mensaje debe tener más de 2 caracteres',
  }),
});

export const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await uploadContactForm(values);
      toast.success('Formulario enviado correctamente');
      form.reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      toast.error('Error al enviar el formulario. Por favor, intenta nuevamente.');
      return;
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-secondaryBg mx-auto w-full max-w-[500px] space-y-6 rounded-2xl p-6 text-white shadow-lg sm:space-y-8 sm:p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  className="border-secondaryBlack text-secondaryBlack placeholder:text-secondaryBlack focus:border-ctas focus:ring-ctas bg-backgroundLight rounded-md border"
                  placeholder="Nombre"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="border-secondaryBlack text-secondaryBlack placeholder:text-secondaryBlack focus:border-ctas focus:ring-ctas bg-backgroundLight rounded-md border"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea
                  className="border-secondaryBlack text-secondaryBlack placeholder:text-secondaryBlack focus:border-ctas focus:ring-ctas bg-backgroundLight rounded-md border"
                  placeholder="Tu mensaje"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto">
          Enviar
        </Button>
      </form>
    </Form>
  );
};
