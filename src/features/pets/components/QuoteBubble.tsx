interface QuoteBubbleProps {
  text: string
}

export const QuoteBubble = ({ text }: QuoteBubbleProps) => (
  <div className="relative inline-flex rounded-3xl bg-fog-50 px-4 py-2 text-sm text-font-primary shadow-soft">
    <span>{text}</span>
    <span className="absolute -bottom-3 left-6 h-3 w-3 rotate-45 bg-fog-50" aria-hidden />
  </div>
)
