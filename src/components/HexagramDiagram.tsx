interface HexagramDiagramProps {
  yaos: { isYang: boolean; isChanging: boolean }[];
  label?: string;
}

export function HexagramDiagram({ yaos, label }: HexagramDiagramProps) {
  return (
    <div className="hexagram-diagram">
      {label && <div className="hexagram-label">{label}</div>}
      <div className="hexagram-lines">
        {[...yaos].reverse().map((yao, i) => (
          <div key={i} className={`hex-line ${yao.isChanging ? 'changing' : ''}`}>
            {yao.isYang ? (
              <div className="hex-yang" />
            ) : (
              <div className="hex-yin">
                <div className="hex-yin-half" />
                <div className="hex-yin-half" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
