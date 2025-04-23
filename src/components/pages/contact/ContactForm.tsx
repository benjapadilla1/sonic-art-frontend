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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-secondaryBg w-full max-w-[500px] space-y-8 rounded-2xl p-8 text-white shadow-lg"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  className="border-secondaryBlack placeholder:text-secondaryBlack focus:border-ctas focus:ring-ctas bg-backgroundLight rounded-md border"
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
                  className="border-secondaryBlack placeholder:text-secondaryBlack focus:border-ctas focus:ring-ctas bg-backgroundLight rounded-md border"
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
                  className="border-secondaryBlack placeholder:text-secondaryBlack focus:border-ctas focus:ring-ctas bg-backgroundLight rounded-md border"
                  placeholder="Tu mensaje"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
};
