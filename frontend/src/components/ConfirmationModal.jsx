import React, { useEffect } from 'react';
import './ConfirmationModal.css';

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'primary', // 'primary' | 'teal' | 'success' | 'warning' | 'danger'
  isLoading = false,
  onConfirm,
  onCancel,
  details = [],
  image = null,
  showCancel = true,
}) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) {
        onCancel?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  const renderIcon = () => {
    switch (confirmVariant) {
      case 'danger':
        return '🗑️';
      case 'warning':
        return '⚠️';
      case 'success':
      case 'teal':
        return '✓';
      case 'primary':
      default:
        return '📅';
    }
  };

  return (
    <div
      className="mc-modal-overlay"
      onClick={!isLoading ? onCancel : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mc-modal-title"
    >
      <div className="mc-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Close Button */}
        <button
          type="button"
          className="mc-modal-close-btn"
          onClick={onCancel}
          disabled={isLoading}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Optional Header Image or Icon Badge */}
        {image ? (
          <div className="mc-modal-image-wrapper">
            <img src={image} alt="" className="mc-modal-header-img" />
          </div>
        ) : (
          <div className={`mc-modal-icon-badge mc-modal-icon-badge--${confirmVariant}`} aria-hidden="true">
            {renderIcon()}
          </div>
        )}

        <h3 id="mc-modal-title" className="mc-modal-title">{title}</h3>
        {message && <p className="mc-modal-message">{message}</p>}

        {details && details.length > 0 && (
          <div className="mc-modal-details-box">
            {details.map((item, idx) => (
              <div key={idx} className="mc-modal-detail-row">
                <span className="mc-modal-detail-label">{item.label}</span>
                <span className="mc-modal-detail-val">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mc-modal-actions">
          {showCancel && (
            <button
              type="button"
              className="mc-modal-btn mc-modal-btn--secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelText}
            </button>
          )}
          {onConfirm && (
            <button
              type="button"
              className={`mc-modal-btn mc-modal-btn--${confirmVariant}`}
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
