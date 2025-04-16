import z from 'zod'

export const userSchema = z.object({
  name: z.string().min(1, "Insira um nome"),
  email: z.string().email("Formato de email inválido."),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
});

export type UserSchema = z.infer<typeof userSchema>;
