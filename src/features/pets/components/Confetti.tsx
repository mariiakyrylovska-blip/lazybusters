import { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  delay: number
  duration: number
  angle: number
  distance: number
  color: string
}

const PASTEL_COLORS = [
  '#FFB3BA', // pastel pink
  '#FFCCCB', // pastel light pink
  '#FFFFBA', // pastel yellow
  '#BAE1FF', // pastel blue
  '#BAFFC9', // pastel green
  '#FFD4BA', // pastel peach
  '#E0BBE4', // pastel purple
  '#D4F1F4', // pastel cyan
]

export const Confetti = ({ isActive }: { isActive: boolean }) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!isActive) return

    const newPieces: ConfettiPiece[] = []
    const pieceCount = 12

    for (let i = 0; i < pieceCount; i++) {
      const angle = (360 / pieceCount) * i
      newPieces.push({
        id: i,
        delay: Math.random() * 0.1,
        duration: 0.6 + Math.random() * 0.4,
        angle,
        distance: 80 + Math.random() * 40,
        color: PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)],
      })
    }

    setPieces(newPieces)

    const timer = setTimeout(() => {
      setPieces([])
    }, 1200)

    return () => clearTimeout(timer)
  }, [isActive])

  return (
    <>
      <style>{`
        @keyframes confetti-burst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--end-x), var(--end-y)) scale(0);
          }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {pieces.map((piece) => {
          const radians = (piece.angle * Math.PI) / 180
          const endX = Math.cos(radians) * piece.distance
          const endY = Math.sin(radians) * piece.distance

          return (
            <div
              key={piece.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-6px',
                marginTop: '-6px',
                backgroundColor: piece.color,
                animation: `confetti-burst ${piece.duration}s ease-out ${piece.delay}s forwards`,
                '--end-x': `${endX}px`,
                '--end-y': `${endY}px`,
              } as React.CSSProperties & { '--end-x': string; '--end-y': string }}
            />
          )
        })}
      </div>
    </>
  )
}

