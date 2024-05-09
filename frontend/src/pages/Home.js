import PaginatedExpenseList from "../components/Expense/PaginatedExpense";
import ExpenseForm from "../components/ExpenseForm";

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8 flex justify-self-auto">
          <div className="w-1/2 px-8">
            <ExpenseForm />
          </div>
          <div className="w-1/2 px-4">
            <PaginatedExpenseList />
          </div>
        </div>
      );
};

export default Home;
