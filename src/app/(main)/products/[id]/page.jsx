import "./ProductDetail.css";

export default function ProductDetail() {
  return (
    <main className="product-detail__container">
      <div className="grid grid__2-cols">
        <div className="product-detail__left">
          <div className="product-detail__main-img-container">
            <img
              src="/images/products/measuring-tape-4.png"
              alt="measuring-tape"
            />
          </div>
          <div className="product-detail__secondary-img-row">
            <div className="product-detail__secondary-img-container">
              <img
                src="/images/products/measuring-tape-1.png"
                alt="measuring-tape"
                className="product-detail__secondary-img"
              />
            </div>
            <div className="product-detail__secondary-img-container">
              <img
                src="/images/products/measuring-tape-2.png"
                alt="measuring-tape"
                className="product-detail__secondary-img"
              />
            </div>
            <div className="product-detail__secondary-img-container">
              <img
                src="/images/products/measuring-tape-3.png"
                alt="measuring-tape"
                className="product-detail__secondary-img"
              />
            </div>
            <div className="product-detail__secondary-img-container">
              <img
                src="/images/products/measuring-tape-4.png"
                alt="measuring-tape"
                className="product-detail__secondary-img"
              />
            </div>
          </div>
        </div>
        <div className="product-detail__right">
          <h1 className="h1 product-name">Apollo Pink Measuring Tape</h1>
          <p className="product-description">
            Designed to make life easier. The blade retracts on its own, and a
            lock button keeps it in place to the measurement you need. The belt
            clip and wrist strap make it easy to keep it close at hand. The
            fraction markings are simple to read even for children. The blade is
            nylon-coated for strength and durability.
          </p>
          <p className="product-price">$8.99</p>
          <div className="size-options">
            <p className="size-title">Sizes:</p>
            <button className="btn btn--sm btn-size">One Size</button>
          </div>

          <div className="qty-and-cart">
            <div className="qty">
              <select value={1} className="select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            <button className="btn btn--primary">Add to cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}
