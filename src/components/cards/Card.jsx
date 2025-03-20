
import PropTypes from "prop-types";
import Button from "../common/Button";
import FavoriteButton from "../common/FavoriteButton";

const Card = ({ product, onViewDetail }) => {
  return (
    <div
      className="relative cursor-pointer bg-white shadow-2xl rounded-3xl"
      onClick={() => onViewDetail(product.idProduct)}
    >
      {/* Botón de favorito */}
      <FavoriteButton productId={product.idProduct} />

      <img
        src={`/provisorio/${product.idProduct}.jpg`} alt={product.name}
        className="w-full h-60 object-cover rounded-t-2xl"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl text-[#1E1E1E]">{product.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl text-[#C78418]">{`$${product.price}`}</h2>
          <Button onClick={() => onViewDetail(product.idProduct)}>Ver</Button>
        </div>


      </div>
    </div>
  );
};
Card.propTypes = {
  product: PropTypes.shape({
    idProduct: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onViewDetail: PropTypes.func.isRequired,
};

export default Card;
