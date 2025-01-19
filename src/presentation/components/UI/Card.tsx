interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    {children}
  </div>
);

export default Card;