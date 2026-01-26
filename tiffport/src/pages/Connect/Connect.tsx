import './Connect.css'

export function Connect() {
  return (
    <div className="connect">
      <div className="connect-image">
        <img src="/11-1.thumb128.png" alt="hamster thumbnail" className="image-placeholder" />
      </div>
      <div className="connect-content">
        <h1 className="connect-name">tiffany lin</h1>
        <p className="connect-email">email@example.com</p>
        <a href="https://linkedin.com/in/yourprofile" className="connect-linkedin">
          linkedin.com/in/yourprofile
        </a>
      </div>
    </div>
  )
}
