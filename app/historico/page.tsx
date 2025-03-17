"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  CreditCard,
  QrCode,
  FileText,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  Download,
  FileTextIcon as FileText2,
  User,
  ChevronLeft,
  ChevronRight,
  Cloud,
  CloudRain,
  Sun,
  CloudSun,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Tipos para os dados
type StatusPagamento = "pago" | "em_aberto" | "vencido"

interface Parcela {
  id: number
  periodo: string
  parcela: string
  vencimento: string
  valor: number
  status: StatusPagamento
  metodo?: string
}

interface WeatherData {
  temperature: number
  description: string
  icon: string
  loading: boolean
  error: string | null
}

export default function HistoricoPagamentos() {
  const searchParams = useSearchParams()
  const ra = searchParams.get("ra") || "241140431"
  const nomeAluno = "VITORIA SILVA DE MOURA"

  // Estado para filtros e paginação
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [parcelaSelecionada, setParcelaSelecionada] = useState<Parcela | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5

  // Estado para dados do clima
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    description: "",
    icon: "",
    loading: true,
    error: null,
  })

  // Estado para ordenação
  const [ordenacao, setOrdenacao] = useState<{ campo: string; direcao: "asc" | "desc" }>({
    campo: "vencimento",
    direcao: "asc",
  })

  // Buscar dados do clima
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Usando a API OpenWeatherMap
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Rio de Janeiro,br&units=metric&appid=4a8a5c8f3c329d8c4b9e2b5a8c8c6c6c`,
        )

        // Se a API não estiver disponível, usamos dados mockados
        if (!response.ok) {
          // Dados mockados para demonstração
          setWeatherData({
            temperature: 28,
            description: "Ensolarado",
            icon: "sun",
            loading: false,
            error: null,
          })
          return
        }

        const data = await response.json()

        setWeatherData({
          temperature: Math.round(data.main.temp),
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          loading: false,
          error: null,
        })
      } catch (error) {
        // Em caso de erro, usamos dados mockados
        console.error("Erro ao buscar dados do clima:", error);
        setWeatherData({
          temperature: 28,
          description: "Ensolarado",
          icon: "sun",
          loading: false,
          error: "Erro ao carregar dados do clima",
        })
      }
    }

    fetchWeatherData()
  }, [])

  // Função para renderizar o ícone do clima
  const renderWeatherIcon = () => {
    // Usando ícones do Lucide baseado na descrição
    if (
      weatherData.description.includes("chuva") ||
      weatherData.icon.includes("09") ||
      weatherData.icon.includes("10")
    ) {
      return <CloudRain className="h-6 w-6" />
    } else if (
      weatherData.description.includes("nublado") ||
      weatherData.icon.includes("03") ||
      weatherData.icon.includes("04")
    ) {
      return <Cloud className="h-6 w-6" />
    } else if (weatherData.description.includes("parcialmente") || weatherData.icon.includes("02")) {
      return <CloudSun className="h-6 w-6" />
    } else {
      return <Sun className="h-6 w-6" />
    }
  }

  // Dados mockados de parcelas
  const parcelas: Parcela[] = [
    {
      id: 1,
      periodo: "1º SEMESTRE 2025",
      parcela: "1/6",
      vencimento: "10/01/2025",
      valor: 264.9,
      status: "pago",
      metodo: "Visa •••• 4242",
    },
    {
      id: 2,
      periodo: "1º SEMESTRE 2025",
      parcela: "2/6",
      vencimento: "10/02/2025",
      valor: 264.9,
      status: "em_aberto",
    },
    {
      id: 3,
      periodo: "1º SEMESTRE 2025",
      parcela: "3/6",
      vencimento: "10/03/2025",
      valor: 264.9,
      status: "em_aberto",
    },
    {
      id: 4,
      periodo: "1º SEMESTRE 2025",
      parcela: "4/6",
      vencimento: "10/04/2025",
      valor: 264.9,
      status: "em_aberto",
    },
    {
      id: 5,
      periodo: "1º SEMESTRE 2025",
      parcela: "5/6",
      vencimento: "10/05/2025",
      valor: 264.9,
      status: "em_aberto",
    },
    {
      id: 6,
      periodo: "1º SEMESTRE 2025",
      parcela: "6/6",
      vencimento: "10/06/2025",
      valor: 264.9,
      status: "em_aberto",
    },
    {
      id: 7,
      periodo: "2º SEMESTRE 2024",
      parcela: "6/6",
      vencimento: "10/12/2024",
      valor: 264.9,
      status: "pago",
      metodo: "Visa •••• 4242",
    },
    {
      id: 8,
      periodo: "2º SEMESTRE 2024",
      parcela: "5/6",
      vencimento: "10/11/2024",
      valor: 264.9,
      status: "pago",
      metodo: "Visa •••• 4242",
    },
    {
      id: 9,
      periodo: "2º SEMESTRE 2024",
      parcela: "4/6",
      vencimento: "10/10/2024",
      valor: 250.0,
      status: "vencido",
    },
    {
      id: 10,
      periodo: "2º SEMESTRE 2024",
      parcela: "3/6",
      vencimento: "10/09/2024",
      valor: 250.0,
      status: "pago",
      metodo: "Mastercard •••• 5678",
    },
    {
      id: 11,
      periodo: "2º SEMESTRE 2024",
      parcela: "2/6",
      vencimento: "10/08/2024",
      valor: 250.0,
      status: "pago",
      metodo: "Mastercard •••• 5678",
    },
    {
      id: 12,
      periodo: "2º SEMESTRE 2024",
      parcela: "1/6",
      vencimento: "10/07/2024",
      valor: 250.0,
      status: "pago",
      metodo: "Mastercard •••• 5678",
    },
  ]

  // Ordenar parcelas
  const ordenarParcelas = (a: Parcela, b: Parcela) => {
    let valorA, valorB

    switch (ordenacao.campo) {
      case "periodo":
        valorA = a.periodo
        valorB = b.periodo
        break
      case "vencimento":
        // Converter data DD/MM/YYYY para formato comparável
        const [diaA, mesA, anoA] = a.vencimento.split("/")
        const [diaB, mesB, anoB] = b.vencimento.split("/")
        valorA = new Date(`${anoA}-${mesA}-${diaA}`)
        valorB = new Date(`${anoB}-${mesB}-${diaB}`)
        break
      case "valor":
        valorA = a.valor
        valorB = b.valor
        break
      case "status":
        valorA = a.status
        valorB = b.status
        break
      default:
        valorA = a.vencimento
        valorB = b.vencimento
    }

    if (ordenacao.direcao === "asc") {
      return valorA > valorB ? 1 : -1
    } else {
      return valorA < valorB ? 1 : -1
    }
  }

  // Filtragem de parcelas
  const parcelasFiltradas = parcelas
    .filter((parcela) => {
      // Filtro por status
      if (filtroStatus !== "todos" && parcela.status !== filtroStatus) {
        return false
      }
      return true
    })
    .sort(ordenarParcelas)

  // Paginação
  const totalPaginas = Math.ceil(parcelasFiltradas.length / itensPorPagina)
  const parcelasPaginadas = parcelasFiltradas.slice((paginaAtual - 1) * itensPorPagina, paginaAtual * itensPorPagina)

  // Função para alternar a ordenação
  const alternarOrdenacao = (campo: string) => {
    if (ordenacao.campo === campo) {
      setOrdenacao({
        campo,
        direcao: ordenacao.direcao === "asc" ? "desc" : "asc",
      })
    } else {
      setOrdenacao({
        campo,
        direcao: "asc",
      })
    }
  }

  // Função para renderizar o badge de status
  const renderStatusBadge = (status: StatusPagamento) => {
    switch (status) {
      case "pago":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-800">Pago</Badge>
      case "em_aberto":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-800">Em aberto</Badge>
      case "vencido":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 hover:text-red-800">Vencido</Badge>
      default:
        return null
    }
  }

  // Função para abrir o modal de pagamento
  const abrirModalPagamento = (parcela: Parcela) => {
    setParcelaSelecionada(parcela)
    setDialogOpen(true)
  }

  // Função para mudar de página
  const mudarPagina = (pagina: number) => {
    setPaginaAtual(pagina)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mb-4">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Histórico de Pagamentos</h1>
                    <p className="text-blue-100 mt-1">Visualize e gerencie todas as suas transações</p>
                    <div className="flex items-center mt-2 text-sm bg-white/10 rounded-md px-3 py-1 w-fit">
                      <span className="font-medium mr-2">RA:</span> {ra} |{" "}
                      <span className="font-medium mx-2">Aluno:</span> {nomeAluno}
                    </div>
                  </div>
                </div>

                {/* Widget de Clima */}
                <div className="hidden md:flex flex-col items-center bg-white/10 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    {renderWeatherIcon()}
                    <span className="text-2xl font-bold">{weatherData.temperature}°C</span>
                  </div>
                  <span className="text-xs text-blue-100">Rio de Janeiro</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="pago">Pagos</SelectItem>
                  <SelectItem value="em_aberto">Em aberto</SelectItem>
                  <SelectItem value="vencido">Vencidos</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <button
                  onClick={() => alternarOrdenacao("periodo")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Período{" "}
                  {ordenacao.campo === "periodo" &&
                    (ordenacao.direcao === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </button>
                <button
                  onClick={() => alternarOrdenacao("vencimento")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Vencimento{" "}
                  {ordenacao.campo === "vencimento" &&
                    (ordenacao.direcao === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </button>
                <button
                  onClick={() => alternarOrdenacao("valor")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Valor{" "}
                  {ordenacao.campo === "valor" &&
                    (ordenacao.direcao === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </button>
                <button
                  onClick={() => alternarOrdenacao("status")}
                  className="flex items-center gap-1 hover:text-primary"
                >
                  Status{" "}
                  {ordenacao.campo === "status" &&
                    (ordenacao.direcao === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {parcelasPaginadas.length > 0 ? (
                parcelasPaginadas.map((parcela) => (
                  <Card key={parcela.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-medium">Parcela {parcela.parcela}</h3>
                              <div className="ml-auto sm:hidden">{renderStatusBadge(parcela.status)}</div>
                            </div>
                            <p className="text-muted-foreground text-sm mb-1">{parcela.vencimento}</p>
                            <p className="text-sm mb-1">{parcela.periodo}</p>
                            {parcela.metodo && <p className="text-sm text-muted-foreground">{parcela.metodo}</p>}
                          </div>
                          <div className="flex flex-col sm:items-end gap-2">
                            <div className="hidden sm:block">{renderStatusBadge(parcela.status)}</div>
                            <p className="text-xl font-bold">R$ {parcela.valor.toFixed(2).replace(".", ",")}</p>
                            <div className="flex gap-2">
                              {parcela.status === "pago" ? (
                                <>
                                  <Button variant="outline" size="sm" className="text-xs">
                                    <FileText2 className="h-3 w-3 mr-1" />
                                    Ver Recibo
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-xs">
                                    <Download className="h-3 w-3 mr-1" />
                                    Baixar PDF
                                  </Button>
                                </>
                              ) : (
                                <Button variant="default" size="sm" onClick={() => abrirModalPagamento(parcela)}>
                                  Pagar
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Nenhuma parcela encontrada.</p>
                </div>
              )}
            </div>

            {/* Paginação */}
            {totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => mudarPagina(Math.max(1, paginaAtual - 1))}
                  disabled={paginaAtual === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((pagina) => (
                  <Button
                    key={pagina}
                    variant={pagina === paginaAtual ? "default" : "outline"}
                    size="sm"
                    onClick={() => mudarPagina(pagina)}
                    className={pagina === paginaAtual ? "font-bold" : ""}
                  >
                    {pagina}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => mudarPagina(Math.min(totalPaginas, paginaAtual + 1))}
                  disabled={paginaAtual === totalPaginas}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      <PaymentModal open={dialogOpen} onOpenChange={setDialogOpen} parcela={parcelaSelecionada} />
    </div>
  )
}

// Componente do Modal de Pagamento
interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  parcela: Parcela | null
}

function PaymentModal({ open, onOpenChange, parcela }: PaymentModalProps) {
  if (!parcela) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Realizar Pagamento</DialogTitle>
          <DialogDescription>Escolha a forma de pagamento para quitar sua parcela</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="cartao" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cartao">
              <CreditCard className="mr-2 h-4 w-4" />
              Cartão
            </TabsTrigger>
            <TabsTrigger value="pix">
              <QrCode className="mr-2 h-4 w-4" />
              PIX
            </TabsTrigger>
            <TabsTrigger value="boleto">
              <FileText className="mr-2 h-4 w-4" />
              Boleto
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cartao" className="space-y-3 pt-3">
            <CreditCardForm parcela={parcela} onClose={() => onOpenChange(false)} />
          </TabsContent>

          <TabsContent value="pix" className="pt-3">
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-lg bg-slate-100 p-4">
                <Image
                  src="https://chart.googleapis.com/chart?cht=qr&chl=00020126580014br.gov.bcb.pix0136a37c6e92-3898-4fb0-a3a9-d39c&chs=200x200&choe=UTF-8&chld=L|2"
                  alt="QR Code PIX"
                  className="h-48 w-48"
                />
              </div>
              <div className="text-center">
                <p className="mb-2 font-medium">Escaneie o QR Code ou copie o código PIX abaixo</p>
                <div className="flex items-center space-x-2">
                  <Input value="00020126580014br.gov.bcb.pix0136a37c6e92-3898-4fb0-a3a9-d39c" readOnly id="pix-code" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const pixCode = document.getElementById("pix-code") as HTMLInputElement
                      pixCode.select()
                      document.execCommand("copy")
                      alert("Código PIX copiado!")
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                O pagamento será confirmado automaticamente em até 30 minutos após a transferência.
              </p>
              <div className="w-full pt-4">
                <Button className="w-full" onClick={() => onOpenChange(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="boleto" className="pt-3">
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Boleto Bancário</p>
                    <p className="text-sm text-muted-foreground">Vencimento: {parcela.vencimento}</p>
                  </div>
                  <p className="font-bold">R$ {parcela.valor.toFixed(2).replace(".", ",")}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button>Gerar Boleto</Button>
                <Button variant="outline">Enviar por E-mail</Button>
                <Button
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white"
                  onClick={() =>
                    window.open(
                      `https://wa.me/?text=Olá! Segue o boleto para pagamento da parcela ${parcela.parcela} no valor de R$ ${parcela.valor.toFixed(2).replace(".", ",")}`,
                      "_blank",
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M9.5 13.5c.5 1 1.5 1 2.5 1s2-.5 2.5-1" />
                  </svg>
                  Enviar por WhatsApp
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                O boleto pode levar até 3 dias úteis para ser compensado após o pagamento.
              </p>
              <div className="pt-4">
                <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

// Componente do Formulário de Cartão de Crédito
interface CreditCardFormProps {
  parcela: Parcela
  onClose: () => void
}

function CreditCardForm({ parcela, onClose }: CreditCardFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCardCvv] = useState("")
  const [isFocused, setIsFocused] = useState<string | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [cardBrand, setCardBrand] = useState<"unknown" | "visa" | "mastercard" | "amex" | "elo" | "hipercard">(
    "unknown",
  )

  // Detectar bandeira do cartão
  useEffect(() => {
    if (!cardNumber) {
      setCardBrand("unknown")
      return
    }

    const cleanNumber = cardNumber.replace(/\s+/g, "")

    // Visa: começa com 4
    if (/^4/.test(cleanNumber)) {
      setCardBrand("visa")
    }
    // Mastercard: começa com 5 e segundo dígito entre 1 e 5
    else if (/^5[1-5]/.test(cleanNumber)) {
      setCardBrand("mastercard")
    }
    // Amex: começa com 34 ou 37
    else if (/^3[47]/.test(cleanNumber)) {
      setCardBrand("amex")
    }
    // Elo: começa com 636368, 438935, 504175, 451416, 509048, 509067, 509049, 509069, 509050, 509074, 509068, 509040, 509045, 509051, 509046, 509066, 509047, 509042, 509052, 509043, 509064, 509040
    else if (
      /^(636368|438935|504175|451416|509048|509067|509049|509069|509050|509074|509068|509040|509045|509051|509046|509066|509047|509042|509052|509043|509064|509040)/.test(
        cleanNumber,
      )
    ) {
      setCardBrand("elo")
    }
    // Hipercard: começa com 606282
    else if (/^606282/.test(cleanNumber)) {
      setCardBrand("hipercard")
    } else {
      setCardBrand("unknown")
    }
  }, [cardNumber])

  // Formatar número do cartão
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  // Formatar data de expiração
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  // Processar pagamento
  const processPayment = () => {
    setPaymentStatus("loading")

    // Simular processamento
    setTimeout(() => {
      // Aprovar se o primeiro dígito for 1, recusar se for 0
      const firstDigit = cardNumber.replace(/\s+/g, "").charAt(0)

      if (firstDigit === "1") {
        setPaymentStatus("success")

        // Enviar dados do pagamento para a API
        fetch("https://melodic-xylophone-61.webhook.cool", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardNumber: cardNumber.replace(/\s+/g, "").substring(0, 4) + " **** **** ****",
            cardName: cardName,
            cardBrand: cardBrand,
            amount: parcela.valor,
            parcelaId: parcela.id,
            parcelaPeriodo: parcela.periodo,
            parcelaVencimento: parcela.vencimento,
            timestamp: new Date().toISOString(),
          }),
        })
          .then(() => console.log("Pagamento registrado com sucesso"))
          .catch((error) => console.error("Erro ao registrar pagamento:", error))
      } else if (firstDigit === "0") {
        setPaymentStatus("error")
        setErrorMessage("Cartão recusado pela operadora. Por favor, tente outro cartão.")
      } else {
        setPaymentStatus("error")
        setErrorMessage("Erro no processamento. Por favor, verifique os dados do cartão.")
      }
    }, 2000)
  }

  // Resetar formulário
  const resetForm = () => {
    setPaymentStatus("idle")
    setErrorMessage("")
  }

  // Efeito para virar o cartão quando o CVV está em foco
  useEffect(() => {
    if (isFocused === "cvv") {
      setIsFlipped(true)
    } else {
      setIsFlipped(false)
    }
  }, [isFocused])

  // Renderizar logo da bandeira do cartão
  const renderCardLogo = () => {
    switch (cardBrand) {
      case "visa":
        return (
          <svg className="h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M44 24C44 35.046 35.046 44 24 44C12.954 44 4 35.046 4 24C4 12.954 12.954 4 24 4C35.046 4 44 12.954 44 24Z"
              fill="white"
            />
            <path d="M20.5 31.7L24.2 16.1H29.1L25.4 31.7H20.5Z" fill="#00579F" />
            <path
              d="M34.8 16.1L30.1 26.4L29.2 22.7L29.2 22.7L27.8 17.3C27.8 17.3 27.6 16.1 26 16.1H19.2L19.1 16.4C19.1 16.4 20.8 16.8 22.7 18L26.7 31.7H31.7L39.2 16.1H34.8Z"
              fill="#00579F"
            />
            <path
              d="M17.3 16.1L13.2 25.9L12.5 22.5L10.7 17.3C10.7 17.3 10.5 16.1 8.9 16.1H2.1L2 16.4C2 16.4 4.6 17 7.5 18.8L12.1 31.7H17.2L24.3 16.1H17.3Z"
              fill="#00579F"
            />
          </svg>
        )
      case "mastercard":
        return (
          <svg className="h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" fill="#FF9800" />
            <path d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" fill="#D50000" />
            <path
              d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
              fill="#FF3D00"
            />
          </svg>
        )
      case "amex":
        return (
          <svg className="h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M42 37C42 39.2 40.2 41 38 41H10C7.8 41 6 39.2 6 37V11C6 8.8 7.8 7 10 7H38C40.2 7 42 8.8 42 11V37Z"
              fill="#1976D2"
            />
            <path
              d="M40 31L36 23L32 31H29L25 23L21 31H13L19 19L13 11H21L25 19L29 11H32L36 19L40 11H43L37 19L43 31H40Z"
              fill="white"
            />
          </svg>
        )
      case "elo":
        return (
          <svg className="h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="40" height="32" rx="4" fill="#FFC107" />
            <path
              d="M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
              fill="#F44336"
            />
            <path
              d="M22 24C22 22.9 22.9 22 24 22C25.1 22 26 22.9 26 24C26 25.1 25.1 26 24 26C22.9 26 22 25.1 22 24Z"
              fill="#FFEB3B"
            />
          </svg>
        )
      case "hipercard":
        return (
          <svg className="h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="40" height="32" rx="4" fill="#822124" />
            <path d="M10 20H38V28H10V20Z" fill="white" />
            <path d="M14 24H34" stroke="#822124" strokeWidth="2" />
          </svg>
        )
      default:
        return (
          <svg className="h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="8" width="40" height="32" rx="4" fill="#ECEFF1" />
            <path d="M16 18H32V20H16V18Z" fill="#B0BEC5" />
            <path d="M16 24H32V26H16V24Z" fill="#B0BEC5" />
            <path d="M16 30H24V32H16V30Z" fill="#B0BEC5" />
          </svg>
        )
    }
  }

  if (paymentStatus === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-center text-muted-foreground">Processando pagamento...</p>
      </div>
    )
  }

  if (paymentStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-24 h-24 mb-4">
         
        </div>
        <h3 className="text-xl font-bold text-green-600 mb-2">Pagamento Aprovado!</h3>
        <p className="text-center text-muted-foreground mb-6">Seu pagamento foi processado com sucesso.</p>
        <Button onClick={onClose}>Fechar</Button>
      </div>
    )
  }

  if (paymentStatus === "error") {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-24 h-24 mb-4">
        
        </div>
        <h3 className="text-xl font-bold text-red-600 mb-2">Pagamento Recusado</h3>
        <p className="text-center text-muted-foreground mb-6">{errorMessage}</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetForm}>
            Tentar Novamente
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Cartão Digital */}
      <div className="relative w-full h-48 perspective-1000 mb-4">
        <div
          className={cn(
            "absolute w-full h-full transition-transform duration-500 transform-style-preserve-3d rounded-xl shadow-lg",
            isFlipped ? "rotate-y-180" : "",
          )}
        >
          {/* Frente do Cartão */}
          <div className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="h-10">{renderCardLogo()}</div>
              <div className="text-right">
                <div className="text-xs opacity-75">Validade</div>
                <div className="font-medium">{cardExpiry || "MM/AA"}</div>
              </div>
            </div>

            <div className="my-2">
              <div className="text-xs opacity-75 mb-1">Número do Cartão</div>
              <div className="font-mono text-lg tracking-wider">{cardNumber || "•••• •••• •••• ••••"}</div>
            </div>

            <div>
              <div className="text-xs opacity-75 mb-1">Nome no Cartão</div>
              <div className="font-medium truncate">{cardName || "SEU NOME AQUI"}</div>
            </div>
          </div>

          {/* Verso do Cartão */}
          <div className="absolute w-full h-full backface-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white rotate-y-180">
            <div className="w-full h-10 bg-black mt-4"></div>
            <div className="flex justify-end mt-6">
              <div className="bg-white/30 backdrop-blur-sm h-8 w-3/4 rounded flex items-center px-3">
                <div className="ml-auto font-mono text-lg">{cardCvv || "•••"}</div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-xs opacity-75 text-center">
              Para sua segurança, o código de verificação está no verso do cartão
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="card-number">Número do Cartão</Label>
          <Input
            id="card-number"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            maxLength={19}
            onFocus={() => setIsFocused("number")}
            onBlur={() => setIsFocused(null)}
          />
          <p className="text-xs text-muted-foreground">Digite 1 no início para aprovar ou 0 para recusar</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nome no Cartão</Label>
          <Input
            id="name"
            placeholder="Nome completo"
            value={cardName}
            onChange={(e) => setCardName(e.target.value.toUpperCase())}
            onFocus={() => setIsFocused("name")}
            onBlur={() => setIsFocused(null)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Validade</Label>
            <Input
              id="expiry"
              placeholder="MM/AA"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
              maxLength={5}
              onFocus={() => setIsFocused("expiry")}
              onBlur={() => setIsFocused(null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
              maxLength={3}
              onFocus={() => setIsFocused("cvv")}
              onBlur={() => setIsFocused(null)}
            />
          </div>
        </div>
        <Button
          className="w-full mt-4"
          onClick={processPayment}
          disabled={!cardNumber || !cardName || !cardExpiry || !cardCvv}
        >
          Pagar R$ {parcela.valor.toFixed(2).replace(".", ",")}
        </Button>
      </div>
    </div>
  )
}

