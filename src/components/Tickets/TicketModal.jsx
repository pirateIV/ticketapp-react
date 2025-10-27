import { useState, useEffect } from "react";
import { X, Loader } from "lucide-react";
import { useTickets } from "@/context/tickets";

const TicketModal = ({
  isOpen,
  onClose,
  onSuccess,
  mode = "create",
  ticket = null,
}) => {
  const { addTicket, editTicket, isLoading } = useTickets();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "medium",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && ticket) {
      setFormData({
        title: ticket.title || "",
        description: ticket.description || "",
        status: ticket.status || "open",
        priority: ticket.priority || "medium",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "open",
        priority: "medium",
      });
    }
    setErrors({});
  }, [mode, ticket, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!["open", "in_progress", "closed"].includes(formData.status)) {
      newErrors.status = "Invalid status value";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (mode === "create") {
        await addTicket(formData);
      } else {
        await editTicket(ticket.id, formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving ticket:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-950/80 flex items-center justify-center p-4 z-50 text-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Create New Ticket" : "Edit Ticket"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter ticket title..."
            />
            {errors.title && (
              <p className="text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              placeholder="Describe the issue or task..."
            />
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="open">🟢 Open</option>
                <option value="in_progress">🟡 In Progress</option>
                <option value="closed">⚫ Closed</option>
              </select>
              {errors.status && (
                <p className="text-red-600 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange("priority", e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading && <Loader className="w-4 h-4 animate-spin" />}
              {mode === "create" ? "Create Ticket" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketModal;
