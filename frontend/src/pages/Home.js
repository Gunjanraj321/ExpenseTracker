import { useSelector } from "react-redux";
import PaginatedExpenseList from "../components/Expense/PaginatedExpense";
import ExpenseForm from "../components/ExpenseForm";
import Leaderboard from "../components/premiumComponent/Leaderboard";

const Home = () => {
  const isPremium = useSelector((state) => state.isPremium);

  return (
    <div className="container mx-auto px-4 py-8 flex justify-self-auto">
      {/* If premium, display Leaderboard on the right */}
      {isPremium ? (
        <>
          <div className="w-4/12 px-4">
            <ExpenseForm />
          </div>
          <div className="w-4/12 px-4">
            <PaginatedExpenseList />
          </div>
          <div className="w-4/12 px-4">
            <Leaderboard />
          </div>
        </>
      ) : (
        <>
          <div className="w-6/12 px-4">
            <ExpenseForm />
          </div>
          <div className="w-6/12 px-4">
            <PaginatedExpenseList />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
