import { useState } from "react";
import { Menu, X, Plane, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = ["Hotels", "Buses", "Deals", "Support"];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#" className="flex items-center gap-2">
          <Plane className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-primary-foreground drop-shadow-sm" style={{ WebkitTextFillColor: "hsl(0 0% 100%)" }}>
            TravelEase
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-primary-foreground/80 hover:text-primary transition-colors" style={{ WebkitTextFillColor: "unset" }}>
              {l}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <User className="h-4 w-4" />
                {user.name.split(" ")[0]}
              </div>
              <Button variant="ghost" className="text-white hover:bg-primary/10" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="text-primary-foreground/90 hover:bg-primary/10" style={{ color: "white" }} onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button className="bg-primary hover:bg-primary/90 btn-primary-glow" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden text-primary-foreground" style={{ color: "white" }} onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-card border-t border-border/20 px-4 pb-4">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="block py-2 text-sm" style={{ color: "white" }} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <div className="flex gap-2 mt-3">
            {user ? (
              <Button variant="outline" size="sm" className="flex-1 border-primary-foreground/30" style={{ color: "white" }} onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" className="flex-1 border-primary-foreground/30" style={{ color: "white" }} onClick={() => navigate("/login")}>Login</Button>
                <Button size="sm" className="flex-1 bg-primary" onClick={() => navigate("/signup")}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import { useState } from "react";
// import { Menu, X, Plane } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const links = ["Hotels", "Buses", "Deals", "Support"];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
//       <div className="container mx-auto flex items-center justify-between px-4 py-3">
//         <a href="#" className="flex items-center gap-2">
//           <Plane className="h-7 w-7 text-primary" />
//           <span className="font-display text-xl font-bold text-primary-foreground drop-shadow-sm" style={{ WebkitTextFillColor: "hsl(0 0% 100%)" }}>
//             TravelEase
//           </span>
//         </a>

//         <div className="hidden md:flex items-center gap-8">
//           {links.map((l) => (
//             <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium text-primary-foreground/80 hover:text-primary transition-colors" style={{ WebkitTextFillColor: "unset" }}>
//               {l}
//             </a>
//           ))}
//         </div>

//         <div className="hidden md:flex items-center gap-3">
//           <Button variant="ghost" className="text-primary-foreground/90 hover:bg-primary/10" style={{ color: "white" }}>
//             Login
//           </Button>
//           <Button className="bg-primary hover:bg-primary/90 btn-primary-glow">
//             Sign Up
//           </Button>
//         </div>

//         <button className="md:hidden text-primary-foreground" style={{ color: "white" }} onClick={() => setOpen(!open)}>
//           {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </div>

//       {open && (
//         <div className="md:hidden glass-card border-t border-border/20 px-4 pb-4">
//           {links.map((l) => (
//             <a key={l} href={`#${l.toLowerCase()}`} className="block py-2 text-sm" style={{ color: "white" }} onClick={() => setOpen(false)}>
//               {l}
//             </a>
//           ))}
//           <div className="flex gap-2 mt-3">
//             <Button variant="outline" size="sm" className="flex-1 border-primary-foreground/30" style={{ color: "white" }}>Login</Button>
//             <Button size="sm" className="flex-1 bg-primary">Sign Up</Button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

