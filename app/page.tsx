import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Portal Acadêmico</CardTitle>
          <CardDescription>Acesse seu histórico de pagamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/historico" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ra">Registro Acadêmico (RA)</Label>
              <Input id="ra" name="ra" placeholder="Digite seu RA" required className="w-full" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/historico?ra=241140431" className="w-full">
            <Button className="w-full">Buscar</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

