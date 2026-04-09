import { Package, Plus, MessageSquare, Map } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const menuItems = [
    { id: "manage-packages", label: "Manage Packages", icon: Package },
    { id: "manage-places", label: "Manage Places", icon: Map },
    { id: "add-package", label: "Add Package", icon: Plus },
    { id: "enquiries", label: "Enquiries", icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100 mb-4 text-center">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/20 translate-x-1" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-50">
        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold">
            A
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-xs font-bold text-gray-900 truncate">Administrator</p>
            <p className="text-[10px] text-gray-500 truncate">admin@yatra.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
