import './Marquee.css'

const TICKER_ITEMS = [
  'Full Stack Developer',
  'React.js',
  'Node.js',
  'Tailwind CSS',
  'JavaScript',
  'Git',
  'Open to Work',
  'Ilorin, Nigeria',
]

const LOOP_COUNT = 4 // total copies rendered -- see Marquee.css for why this must match

export default function Marquee() {
  const items = Array(LOOP_COUNT).fill(TICKER_ITEMS).flat()

  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
            <span className="marquee-glyph">&#x2726;</span>
          </span>
        ))}
      </div>
    </div>
  )
}