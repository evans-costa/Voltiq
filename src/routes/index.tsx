import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AlertCircle,
	ArrowRight,
	Bolt,
	Check,
	CheckCircle,
	Database,
	FileSpreadsheet,
	FileText,
	Layers,
	Lock,
	Sparkles,
	TrendingUp,
	User,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/features/auth/hooks/use-auth-store";

export const Route = createFileRoute("/")({
	component: IndexPage,
});

type StepType = "draft" | "finalized" | "pdf" | "approved" | "rejected";

// Sub-component: Mock budget visual preview for the Hero
function HeroCodeVisual() {
	return (
		<div className="relative lg:col-span-5">
			<div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-primary/10 to-secondary/10 blur-xl" />
			<Card className="relative overflow-hidden border border-border bg-card/65 shadow-2xl backdrop-blur-md">
				<div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-primary to-secondary" />

				<CardContent className="p-6">
					<div className="mb-4 flex items-center justify-between border-border border-b pb-3">
						<div>
							<h3 className="font-bold font-heading text-foreground text-sm">
								Orçamento #ORC-2026-009
							</h3>
							<p className="mt-0.5 text-[10px] text-muted-foreground">
								Cliente: Residencial Condomínio Alpha
							</p>
						</div>
						<span className="rounded-full bg-accent px-2 py-0.5 font-mono font-semibold text-[10px] text-primary uppercase tracking-wider">
							Em Elaboração
						</span>
					</div>

					<div className="space-y-2.5">
						<p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
							Materiais e Serviços do Projeto
						</p>

						<div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-2 text-xs">
							<div className="flex items-center gap-2">
								<span className="rounded bg-secondary/15 px-1.5 py-0.5 font-bold font-mono text-[9px] text-secondary">
									MAT
								</span>
								<span className="font-medium text-foreground">
									Disjuntor Tripolar Din 32A (x2)
								</span>
							</div>
							<span className="font-mono text-muted-foreground text-xs tabular-nums">
								R$ 185,00
							</span>
						</div>

						<div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-2 text-xs">
							<div className="flex items-center gap-2">
								<span className="rounded bg-secondary/15 px-1.5 py-0.5 font-bold font-mono text-[9px] text-secondary">
									MAT
								</span>
								<span className="font-medium text-foreground">
									Cabo Flexível de Cobre 6mm² (50m)
								</span>
							</div>
							<span className="font-mono text-muted-foreground text-xs tabular-nums">
								R$ 305,00
							</span>
						</div>

						<div className="flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-2 text-xs">
							<div className="flex items-center gap-2">
								<span className="rounded bg-primary/15 px-1.5 py-0.5 font-bold font-mono text-[9px] text-primary">
									SER
								</span>
								<span className="font-medium text-foreground">
									Mão de Obra e Cablagem Técnica
								</span>
							</div>
							<span className="font-mono text-muted-foreground text-xs tabular-nums">
								R$ 960,00
							</span>
						</div>
					</div>

					<div className="mt-5 space-y-2 border-border/60 border-t pt-4">
						<div className="flex justify-between text-muted-foreground text-xs">
							<span>Subtotal de Custo:</span>
							<span className="font-mono tabular-nums">R$ 1.450,00</span>
						</div>
						<div className="flex justify-between text-secondary text-xs">
							<span className="flex items-center gap-1">
								<TrendingUp className="size-3.5" /> Margem de Lucro (+30%):
							</span>
							<span className="font-bold font-mono tabular-nums">
								R$ 435,00
							</span>
						</div>
						<div className="flex justify-between text-status-pdf text-xs">
							<span>Impostos Estimados (+12%):</span>
							<span className="font-bold font-mono tabular-nums">
								R$ 174,00
							</span>
						</div>
						<div className="flex items-center justify-between border-border border-t pt-2.5">
							<span className="font-bold font-heading text-foreground text-xs uppercase tracking-wider">
								Preço Total Sugerido:
							</span>
							<span className="font-black font-mono text-primary text-xl tabular-nums tracking-tight">
								R$ 2.059,00
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

// Sub-component: Stepper Card Preview
function StepPreviewCard({ activeStep }: { activeStep: StepType }) {
	return (
		<div className="md:col-span-7">
			<Card className="flex h-full flex-col overflow-hidden border border-border bg-card/70 shadow-xl backdrop-blur-xs">
				<div className="flex items-center justify-between border-border border-b bg-muted/20 px-5 py-4">
					<span className="font-bold font-heading text-foreground text-xs">
						Orçamento #ORC-2026-004
					</span>
					<span
						className={`rounded-full px-2.5 py-0.5 font-mono font-semibold text-xs tracking-wide ${
							activeStep === "draft"
								? "border border-status-draft/25 bg-status-draft/10 text-status-draft"
								: ""
						} ${
							activeStep === "finalized"
								? "border border-status-finalized/25 bg-status-finalized/10 text-status-finalized"
								: ""
						} ${
							activeStep === "pdf"
								? "border border-status-pdf/25 bg-status-pdf/10 text-status-pdf"
								: ""
						} ${
							activeStep === "approved"
								? "border border-status-approved/25 bg-status-approved/10 text-status-approved"
								: ""
						} ${
							activeStep === "rejected"
								? "border border-status-rejected/25 bg-status-rejected/10 text-status-rejected"
								: ""
						}`}
					>
						{activeStep === "draft" && "Rascunho"}
						{activeStep === "finalized" && "Finalizado"}
						{activeStep === "pdf" && "PDF Gerado"}
						{activeStep === "approved" && "Aprovado"}
						{activeStep === "rejected" && "Recusado"}
					</span>
				</div>

				<div className="flex-1 space-y-4 p-5">
					{activeStep === "draft" && (
						<div className="space-y-3">
							<div className="flex items-center justify-between border-border border-b pb-2 text-muted-foreground text-xs">
								<span>Insumos Adicionados (2)</span>
								<span className="font-bold text-primary">+ Adicionar Item</span>
							</div>
							<div className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-2.5">
								<div className="flex items-center gap-2">
									<span className="rounded bg-secondary/15 px-1.5 py-0.5 font-bold font-mono text-[10px] text-secondary">
										MAT
									</span>
									<span className="font-medium text-xs">
										Cabo Flexível Corrugado 3/4"
									</span>
								</div>
								<span className="font-bold font-mono text-xs">R$ 150,00</span>
							</div>
							<div className="flex items-center justify-between rounded-lg border border-border bg-background/50 p-2.5">
								<div className="flex items-center gap-2">
									<span className="rounded bg-primary/15 px-1.5 py-0.5 font-bold font-mono text-[10px] text-primary">
										SER
									</span>
									<span className="font-medium text-xs">
										Passagem de Fiação Técnica (8h)
									</span>
								</div>
								<span className="font-bold font-mono text-xs">R$ 960,00</span>
							</div>
							<div className="flex justify-end gap-2 pt-2">
								<Button className="h-8 text-xs" size="sm" variant="outline">
									Editar Taxas
								</Button>
								<Button
									className="h-8 border-0 bg-status-finalized text-white text-xs hover:bg-status-finalized/90"
									size="sm"
								>
									Fechar Orçamento
								</Button>
							</div>
						</div>
					)}

					{activeStep === "finalized" && (
						<div className="space-y-4">
							<div className="flex gap-2 rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
								<Lock className="mt-0.5 size-4 shrink-0 text-yellow-600" />
								<div className="text-xs text-yellow-600">
									<p className="font-bold">Valores Congelados para Edição</p>
									<p className="opacity-90">
										Este orçamento está no modo de leitura para geração de
										proposta comercial estável.
									</p>
								</div>
							</div>
							<div className="space-y-2 font-mono text-xs">
								<div className="flex justify-between text-muted-foreground">
									<span>Total Insumos:</span>
									<span className="tabular-nums">R$ 1.110,00</span>
								</div>
								<div className="flex justify-between text-muted-foreground">
									<span>Margem de Lucro (+30%):</span>
									<span className="tabular-nums">R$ 333,00</span>
								</div>
								<div className="flex justify-between border-border border-t pt-2 font-bold text-foreground">
									<span>Total Final:</span>
									<span className="text-sm text-status-finalized tabular-nums">
										R$ 1.443,00
									</span>
								</div>
							</div>
							<div className="flex justify-end gap-2 pt-2">
								<Button className="h-8 text-xs" size="sm" variant="outline">
									Destravar Rascunho
								</Button>
								<Button
									className="h-8 border-0 bg-status-pdf text-white text-xs hover:bg-status-pdf/90"
									size="sm"
								>
									Emitir PDF Comercial
								</Button>
							</div>
						</div>
					)}

					{activeStep === "pdf" && (
						<div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
							<div className="flex size-14 items-center justify-center rounded-full bg-status-pdf/10 text-status-pdf">
								<FileText className="size-7" />
							</div>
							<div className="space-y-1">
								<h4 className="font-bold text-foreground text-sm">
									Proposta_ORC-2026-004.pdf
								</h4>
								<p className="text-muted-foreground text-xs">
									Documento gerado e armazenado na nuvem do Voltiq.
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Button className="h-8 text-xs" size="sm" variant="outline">
									Visualizar Documento
								</Button>
								<Button
									className="h-8 border-0 bg-status-approved text-white text-xs hover:bg-status-approved/90"
									size="sm"
								>
									Aprovar Proposta
								</Button>
							</div>
						</div>
					)}

					{activeStep === "approved" && (
						<div className="space-y-4 py-2">
							<div className="flex gap-3 rounded-lg border border-status-approved/20 bg-status-approved/5 p-4">
								<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-status-approved/15 text-status-approved">
									<Check className="size-4" />
								</div>
								<div className="text-xs">
									<p className="font-bold text-status-approved">
										Proposta Comercial Aprovada!
									</p>
									<p className="mt-0.5 text-muted-foreground">
										Assinatura autorizada pelo cliente em 10/07/2026.
									</p>
								</div>
							</div>
							<div className="space-y-2 rounded-lg border border-border bg-muted/20 p-3">
								<p className="font-mono text-[10px] text-muted-foreground uppercase">
									Próximas Ações
								</p>
								<ul className="space-y-1 text-foreground text-xs">
									<li className="flex items-center gap-1.5">
										<CheckCircle className="size-3 text-status-approved" />
										Planejar compra de materiais (R$ 150,00)
									</li>
									<li className="flex items-center gap-1.5">
										<CheckCircle className="size-3 text-status-approved" />
										Agendar equipe de cablagem (8 horas)
									</li>
								</ul>
							</div>
						</div>
					)}

					{activeStep === "rejected" && (
						<div className="space-y-4">
							<div className="flex gap-3 rounded-lg border border-status-rejected/20 bg-status-rejected/5 p-4">
								<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-status-rejected/15 text-status-rejected">
									<AlertCircle className="size-4" />
								</div>
								<div className="text-xs">
									<p className="font-bold text-status-rejected">
										Proposta Recusada pelo Cliente
									</p>
									<p className="mt-0.5 text-muted-foreground">
										Motivo: "Orçamento acima do teto estipulado pela
										construtora."
									</p>
								</div>
							</div>
							<div className="flex justify-end gap-2 pt-2">
								<Button
									className="h-8 border-status-rejected/30 text-status-rejected text-xs hover:bg-status-rejected/5"
									size="sm"
									variant="outline"
								>
									Registrar Perda
								</Button>
								<Button
									className="h-8 border-0 bg-primary text-primary-foreground text-xs hover:bg-primary/90"
									size="sm"
								>
									Duplicar e Revisar (V2)
								</Button>
							</div>
						</div>
					)}
				</div>
			</Card>
		</div>
	);
}

// Sub-component: Stepper Left Pane (Status Description)
function StepDescriptionPane({ activeStep }: { activeStep: StepType }) {
	return (
		<div className="flex flex-col justify-center space-y-4 rounded-2xl border border-border bg-muted/10 p-6 md:col-span-5">
			<div>
				<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
					Status Ativo
				</span>
				<h3 className="mt-1 flex items-center gap-2 font-bold font-heading text-2xl text-foreground">
					{activeStep === "draft" && "🔌 Rascunho"}
					{activeStep === "finalized" && "📋 Fechado"}
					{activeStep === "pdf" && "⚡ Emitida (PDF Gerado)"}
					{activeStep === "approved" && "✅ Aprovado"}
					{activeStep === "rejected" && "❌ Recusado"}
				</h3>
			</div>

			<p className="text-muted-foreground text-sm leading-relaxed">
				{activeStep === "draft" &&
					"Aqui você cria o orçamento, define o cliente e insere todos os insumos (materiais e mão de obra). O projeto é dinâmico: as margens de lucro e as taxas podem ser ajustadas a qualquer momento para buscar a precificação ótima."}
				{activeStep === "finalized" &&
					"Uma vez fechados os quantitativos, você finaliza o orçamento. Isso congela os valores e itens para auditoria, impedindo qualquer alteração acidental nas tabelas de preços antes do fechamento comercial."}
				{activeStep === "pdf" &&
					"O Voltiq gera e armazena automaticamente o PDF final da proposta. Esse documento com cabeçalho técnico e termos gerais é emitido com um número de proposta sequencial para que você possa enviar ao seu cliente."}
				{activeStep === "approved" &&
					"O cliente revisou e aceitou a proposta formal. O status é alterado para Aprovado, o que libera o projeto no sistema para planejamento de compras e início da execução física dos serviços."}
				{activeStep === "rejected" &&
					"Caso o cliente recuse por prazo, escopo ou preço, o orçamento entra no status Recusado. A partir deste ponto, você pode duplicar o orçamento para criar uma revisão ('Versão 2') e iniciar uma nova negociação."}
			</p>

			<div className="flex items-center gap-2 font-mono text-xs">
				<div className="size-2 animate-ping rounded-full bg-primary" />
				<span className="text-muted-foreground">
					Estado de dados:{" "}
					<span className="font-bold text-foreground">
						{activeStep === "draft" && "Editável / Em Edição"}
						{activeStep === "finalized" && "Travado para Edição"}
						{activeStep === "pdf" && "Exportado / Proposta Enviada"}
						{activeStep === "approved" && "Fechado / Ganho"}
						{activeStep === "rejected" && "Fechado / Renegociando"}
					</span>
				</span>
			</div>
		</div>
	);
}

// Sub-component: Entire Lifecycle Stepper Block
function BudgetLifecycleStepper() {
	const [activeStep, setActiveStep] = useState<StepType>("draft");

	const steps = [
		{
			id: "draft" as const,
			label: "Rascunho",
			icon: Bolt,
			color: "border-status-draft text-status-draft bg-status-draft/10",
			description: "Elaboração técnica",
		},
		{
			id: "finalized" as const,
			label: "Finalizado",
			icon: Lock,
			color:
				"border-status-finalized text-status-finalized bg-status-finalized/10",
			description: "Revisão e travamento",
		},
		{
			id: "pdf" as const,
			label: "PDF Gerado",
			icon: FileText,
			color: "border-status-pdf text-status-pdf bg-status-pdf/10",
			description: "Geração da proposta",
		},
		{
			id: "approved" as const,
			label: "Aprovado",
			icon: CheckCircle,
			color:
				"border-status-approved text-status-approved bg-status-approved/10",
			description: "Aceito pelo cliente",
		},
		{
			id: "rejected" as const,
			label: "Rejeitado",
			icon: AlertCircle,
			color:
				"border-status-rejected text-status-rejected bg-status-rejected/10",
			description: "Recusado pelo cliente",
		},
	];

	return (
		<section className="border-border border-b py-20" id="lifecycle">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
					<h2 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
						O Ciclo de Vida do seu Orçamento
					</h2>
					<p className="text-muted-foreground">
						Entenda o fluxo comercial e operacional do Voltiq. Clique em cada
						status para ver a transformação dos dados na aplicação real.
					</p>
				</div>

				<div className="mx-auto max-w-4xl space-y-8">
					<div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-card/40 p-2 backdrop-blur-xs sm:flex sm:items-center sm:justify-between">
						{steps.map((step) => {
							const Icon = step.icon;
							const isActive = activeStep === step.id;
							return (
								<button
									className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left font-heading font-medium transition-all sm:justify-center sm:text-center ${
										isActive
											? `${step.color} scale-[1.02] border border-border shadow-sm`
											: "text-muted-foreground hover:bg-muted"
									}`}
									key={step.id}
									onClick={() => setActiveStep(step.id)}
									type="button"
								>
									<Icon className="size-4 shrink-0" />
									<div className="text-left text-xs">
										<div className="font-bold">{step.label}</div>
										<div className="hidden text-[10px] opacity-75 sm:block">
											{step.description}
										</div>
									</div>
								</button>
							);
						})}
					</div>

					<div className="relative">
						<div className="pointer-events-none absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent blur-2xl" />
						<div className="grid items-stretch gap-8 md:grid-cols-12">
							<StepDescriptionPane activeStep={activeStep} />
							<StepPreviewCard activeStep={activeStep} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// Sub-component: Features Grid Section
function FeaturesGrid() {
	return (
		<section className="border-border border-b bg-muted/20 py-20" id="features">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
					<h2 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
						Projetado para eliminar gargalos comerciais
					</h2>
					<p className="text-muted-foreground">
						Chega de erros matemáticos de margens de lucro ou atrasos para
						enviar propostas. O Voltiq centraliza e automatiza suas cotações em
						uma única plataforma técnica.
					</p>
				</div>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					<Card className="group relative overflow-hidden border border-border bg-card/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
						<div className="absolute top-0 left-0 h-1 w-full bg-secondary opacity-60 transition-opacity group-hover:opacity-100" />
						<CardContent className="space-y-4 p-6 pt-8">
							<div className="flex size-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
								<User className="size-5" />
							</div>
							<h3 className="font-bold font-heading text-foreground text-lg">
								Centralização de Clientes
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Gerencie o cadastro de pessoas físicas (CPF) e jurídicas (CNPJ),
								mantendo o histórico de propostas e informações comerciais
								sempre centralizadas e acessíveis.
							</p>
						</CardContent>
					</Card>

					<Card className="group relative overflow-hidden border border-border bg-card/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
						<div className="absolute top-0 left-0 h-1 w-full bg-primary opacity-60 transition-opacity group-hover:opacity-100" />
						<CardContent className="space-y-4 p-6 pt-8">
							<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<Database className="size-5" />
							</div>
							<h3 className="font-bold font-heading text-foreground text-lg">
								Catálogo de Materiais
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Padronize seus insumos: disjuntores, cabos, conexões e caixas de
								passagem com preços unitários salvos, acabando com a necessidade
								de pesquisar valores a cada cotação.
							</p>
						</CardContent>
					</Card>

					<Card className="group relative overflow-hidden border border-border bg-card/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
						<div className="absolute top-0 left-0 h-1 w-full bg-secondary opacity-60 transition-opacity group-hover:opacity-100" />
						<CardContent className="space-y-4 p-6 pt-8">
							<div className="flex size-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
								<TrendingUp className="size-5" />
							</div>
							<h3 className="font-bold font-heading text-foreground text-lg">
								Preços e Margens Precisas
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Cálculo automático de custos, margem de lucro, taxas e impostos
								para cada material ou mão de obra, garantindo que você nunca
								venda serviços com prejuízo.
							</p>
						</CardContent>
					</Card>

					<Card className="group relative overflow-hidden border border-border bg-card/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
						<div className="absolute top-0 left-0 h-1 w-full bg-primary opacity-60 transition-opacity group-hover:opacity-100" />
						<CardContent className="space-y-4 p-6 pt-8">
							<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<FileText className="size-5" />
							</div>
							<h3 className="font-bold font-heading text-foreground text-lg">
								Geração de Propostas em PDF
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Gere em segundos uma proposta comercial em PDF perfeitamente
								formatada, com papel timbrado, discriminação de materiais e mão
								de obra, e pronto para envio.
							</p>
						</CardContent>
					</Card>

					<Card className="group relative overflow-hidden border border-border bg-card/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
						<div className="absolute top-0 left-0 h-1 w-full bg-secondary opacity-60 transition-opacity group-hover:opacity-100" />
						<CardContent className="space-y-4 p-6 pt-8">
							<div className="flex size-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
								<Layers className="size-5" />
							</div>
							<h3 className="font-bold font-heading text-foreground text-lg">
								Acompanhamento de Status
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Monitore visualmente o progresso das suas propostas enviadas.
								Saiba de relance quais propostas estão pendentes, emitidas,
								aprovadas ou recusadas.
							</p>
						</CardContent>
					</Card>

					<Card className="group relative overflow-hidden border border-border bg-card/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
						<div className="absolute top-0 left-0 h-1 w-full bg-primary opacity-60 transition-opacity group-hover:opacity-100" />
						<CardContent className="space-y-4 p-6 pt-8">
							<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
								<FileSpreadsheet className="size-5" />
							</div>
							<h3 className="font-bold font-heading text-foreground text-lg">
								Relatórios e Planilhas
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Visualize a listagem consolidada de todos os seus orçamentos
								ativos para controlar o faturamento previsto e otimizar as
								compras de insumos para cada obra.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}

// Sub-component: How It Works Section
function HowItWorksSection() {
	return (
		<section className="border-border border-b bg-muted/10 py-20" id="benefits">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
					<h2 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
						Agilidade técnica em 4 passos simples
					</h2>
					<p className="text-muted-foreground">
						Nossa plataforma foi pensada para se integrar à rotina de
						instaladores e prestadores de serviços elétricos de forma imediata.
					</p>
				</div>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					<div className="relative space-y-3">
						<div className="font-black font-heading text-5xl text-primary/30">
							01
						</div>
						<h3 className="font-bold font-heading text-foreground text-lg">
							Cadastre Itens
						</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Adicione materiais e estime horas de serviços de forma detalhada
							na tela de criação de orçamentos.
						</p>
					</div>

					<div className="relative space-y-3">
						<div className="font-black font-heading text-5xl text-primary/30">
							02
						</div>
						<h3 className="font-bold font-heading text-foreground text-lg">
							Defina a Margem
						</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Insira a margem de lucro desejada e os impostos locais. O Voltiq
							calcula o valor final sem erros matemáticos.
						</p>
					</div>

					<div className="relative space-y-3">
						<div className="font-black font-heading text-5xl text-primary/30">
							03
						</div>
						<h3 className="font-bold font-heading text-foreground text-lg">
							Gere o PDF
						</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Emita a proposta formal em PDF estruturado com um único clique,
							pronta para compartilhar com o cliente.
						</p>
					</div>

					<div className="relative space-y-3">
						<div className="font-black font-heading text-5xl text-primary/30">
							04
						</div>
						<h3 className="font-bold font-heading text-foreground text-lg">
							Acompanhe Status
						</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Monitore se o cliente aceitou ou recusou a proposta para otimizar
							seu pipeline de vendas e faturamento.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

// Sub-component: Footer
function Footer() {
	return (
		<footer className="border-border border-t bg-card py-12">
			<div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
				<div className="flex items-center gap-2">
					<div className="flex size-7 items-center justify-center rounded bg-accent text-primary">
						<Bolt className="size-4" />
					</div>
					<span className="font-extrabold font-heading text-base text-foreground tracking-tight">
						Voltiq
					</span>
				</div>

				<p className="text-muted-foreground text-xs">
					Voltiq v1.0.0 — Software para Elaboração e Gestão de Propostas
					Comerciais Técnicas.
				</p>

				<div className="text-right font-mono text-muted-foreground text-xs">
					© {new Date().getFullYear()} Todos os direitos reservados.
				</div>
			</div>
		</footer>
	);
}

// Main Page Component
function IndexPage() {
	const { isAuthenticated, user } = useAuthStore();

	return (
		<div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/30">
			<header className="sticky top-0 z-40 w-full border-border border-b bg-background/80 backdrop-blur-md">
				<div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
					<Link
						className="flex items-center gap-2 transition-opacity hover:opacity-95"
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						to="/"
					>
						<div className="flex size-9 items-center justify-center rounded-lg bg-accent text-primary shadow-md shadow-primary/10">
							<Bolt className="size-5" />
						</div>
						<span className="font-extrabold font-heading text-foreground text-xl tracking-tight">
							Voltiq
						</span>
					</Link>

					<nav className="hidden items-center gap-6 md:flex">
						<a
							className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
							href="#features"
						>
							Recursos
						</a>
						<a
							className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
							href="#lifecycle"
						>
							Fluxo de Trabalho
						</a>
						<a
							className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
							href="#benefits"
						>
							Como Funciona
						</a>
					</nav>

					<div className="flex items-center gap-4">
						<ThemeToggle />
						{isAuthenticated ? (
							<div className="flex items-center gap-3">
								<span className="hidden font-mono text-muted-foreground text-xs sm:inline">
									Olá, {user?.name.split(" ")[0]}
								</span>
								<Link to="/login">
									<Button className="h-9 font-heading font-medium shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 active:translate-y-px">
										Acessar Painel
									</Button>
								</Link>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<Link to="/login">
									<Button
										className="h-9 font-heading font-medium text-sm transition-colors"
										variant="ghost"
									>
										Entrar
									</Button>
								</Link>
								<Link to="/login">
									<Button className="h-9 font-heading font-medium shadow-md shadow-primary/20 transition-all hover:shadow-primary/35 active:translate-y-px">
										Começar Grátis
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative overflow-hidden border-border border-b bg-grid-pattern py-20 lg:py-32">
				<div className="pointer-events-none absolute top-1/4 left-1/4 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 opacity-30 blur-3xl filter" />
				<div className="pointer-events-none absolute right-1/4 bottom-1/4 size-96 translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/10 opacity-30 blur-3xl filter" />

				<div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-12 lg:items-center">
						<div className="space-y-6 text-center lg:col-span-7 lg:text-left">
							<div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent/50 px-3 py-1 font-mono font-semibold text-primary text-xs uppercase tracking-wider">
								<Sparkles className="size-3" />
								Orçamentação Inteligente de Instalações
							</div>

							<h1 className="font-extrabold font-heading text-4xl text-foreground leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
								Orçamentos rápidos. <br />
								<span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
									Margens precisas.
								</span>{" "}
								<br />
								Propostas profissionais.
							</h1>

							<p className="mx-auto max-w-2xl text-base text-muted-foreground leading-relaxed sm:text-lg lg:mx-0">
								Desenvolvido especificamente para eletricistas, instaladores,
								engenheiros e empreiteiros de infraestrutura. Diga adeus a erros
								de planilhas e crie orçamentos impecáveis com relatórios e PDFs
								deslumbrantes para os seus clientes.
							</p>

							<div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row lg:justify-start">
								{isAuthenticated ? (
									<Link to="/login">
										<Button className="h-12 w-full px-8 font-heading font-semibold text-base shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 active:translate-y-px sm:w-auto">
											Entrar no Painel <ArrowRight className="ml-2 size-5" />
										</Button>
									</Link>
								) : (
									<>
										<Link className="w-full sm:w-auto" to="/login">
											<Button className="h-12 w-full px-8 font-heading font-semibold text-base shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 active:translate-y-px sm:w-auto">
												Criar Conta Grátis{" "}
												<ArrowRight className="ml-2 size-5" />
											</Button>
										</Link>
										<a className="w-full sm:w-auto" href="#lifecycle">
											<Button
												className="h-12 w-full bg-background/50 px-8 font-heading font-semibold text-base transition-colors hover:bg-muted/50 sm:w-auto"
												variant="outline"
											>
												Conhecer o Fluxo
											</Button>
										</a>
									</>
								)}
							</div>
						</div>

						<HeroCodeVisual />
					</div>
				</div>
			</section>

			{/* Features Grid */}
			<FeaturesGrid />

			{/* Budget Lifecycle Stepper */}
			<BudgetLifecycleStepper />

			{/* How it Works */}
			<HowItWorksSection />

			{/* Call to Action Final */}
			<section className="relative overflow-hidden bg-grid-pattern py-20">
				<div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-accent/5 to-transparent" />

				<div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
					<Card className="relative mx-auto max-w-4xl overflow-hidden border border-border bg-card/75 p-8 shadow-2xl backdrop-blur-md sm:p-12">
						<div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-primary to-secondary" />

						<div className="mx-auto max-w-2xl space-y-6">
							<h2 className="font-extrabold font-heading text-3xl text-foreground tracking-tight sm:text-4xl">
								Pronto para profissionalizar seus orçamentos?
							</h2>
							<p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
								Crie propostas comerciais deslumbrantes em minutos e encante
								seus clientes desde o primeiro contato técnico. Entre na
								plataforma hoje mesmo.
							</p>

							<div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
								{isAuthenticated ? (
									<Link className="w-full sm:w-auto" to="/login">
										<Button className="h-12 w-full px-8 font-heading font-semibold text-base shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 active:translate-y-px sm:w-auto">
											Ir para o Painel <ArrowRight className="ml-2 size-5" />
										</Button>
									</Link>
								) : (
									<>
										<Link className="w-full sm:w-auto" to="/login">
											<Button className="h-12 w-full px-8 font-heading font-semibold text-base shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 active:translate-y-px sm:w-auto">
												Criar Conta Grátis
											</Button>
										</Link>
										<Link className="w-full sm:w-auto" to="/login">
											<Button
												className="h-12 w-full bg-background/50 px-8 font-heading font-semibold text-base transition-colors hover:bg-muted/50 sm:w-auto"
												variant="outline"
											>
												Acessar Conta Existente
											</Button>
										</Link>
									</>
								)}
							</div>
						</div>
					</Card>
				</div>
			</section>

			<Footer />
		</div>
	);
}
