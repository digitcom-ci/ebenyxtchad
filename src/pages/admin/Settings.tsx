import React, { useState, useEffect } from 'react';
import api from '../../lib/api.js';
import { useSettings } from '../../context/SettingsContext.js';
import toast, { Toaster } from 'react-hot-toast';
import { FaSave, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

export const Settings: React.FC = () => {
  const { refreshSettings } = useSettings();
  const [formData, setFormData] = useState({
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    social_linkedin: '',
    social_facebook: '',
    social_twitter: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get('/settings');
        if (response.data.success) {
          const s = response.data.data;
          setFormData({
            contact_phone: s.contact_phone || '',
            contact_email: s.contact_email || '',
            contact_address: s.contact_address || '',
            social_linkedin: s.social_linkedin || '',
            social_facebook: s.social_facebook || '',
            social_twitter: s.social_twitter || '',
          });
        }
      } catch (err) {
        toast.error('Impossible de charger les paramètres.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await api.post('/settings', formData);
      if (response.data.success) {
        toast.success('Paramètres enregistrés avec succès.');
        await refreshSettings(); // Refresh global contexts
      } else {
        toast.error(response.data.message || 'Une erreur est survenue.');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur lors de l\'enregistrement.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-xs">
      <Toaster position="top-right" />
      <div>
        <h1 className="text-xl font-bold text-white mb-2">Paramètres Globaux du Site</h1>
        <p className="text-gray-400">Modifiez les coordonnées de contact et les liens de réseaux sociaux affichés sur le site.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-navy-light/50 border border-gray-850 p-8 rounded-2xl flex flex-col gap-6 shadow text-gray-300">
        
        {/* Contact Info Group */}
        <div>
          <h3 className="text-white font-bold text-sm mb-4 pb-2 border-b border-gray-850 flex items-center gap-2">
            <FaEnvelope size={14} className="text-gold" />
            <span>Coordonnées de Contact</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-400 flex items-center gap-1.5">
                <FaPhoneAlt size={10} />
                <span>Téléphone de contact</span>
              </label>
              <input
                type="text"
                name="contact_phone"
                value={formData.contact_phone}
                onChange={handleChange}
                placeholder="(+235) 30 69 69 69"
                className="w-full bg-navy border border-gray-800 p-3 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-400 flex items-center gap-1.5">
                <FaEnvelope size={10} />
                <span>Adresse e-mail de contact</span>
              </label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                placeholder="commercial-tchad@ebenyx.com"
                className="w-full bg-navy border border-gray-800 p-3 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-semibold text-gray-400 flex items-center gap-1.5">
                <FaMapMarkerAlt size={10} />
                <span>Adresse physique</span>
              </label>
              <input
                type="text"
                name="contact_address"
                value={formData.contact_address}
                onChange={handleChange}
                placeholder="Sabangali, N'Djamena, Tchad"
                className="w-full bg-navy border border-gray-800 p-3 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Social Networks Group */}
        <div className="mt-4">
          <h3 className="text-white font-bold text-sm mb-4 pb-2 border-b border-gray-850 flex items-center gap-2">
            <FaLinkedin size={14} className="text-gold" />
            <span>Réseaux Sociaux</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Linkedin */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-400 flex items-center gap-1.5">
                <FaLinkedin size={11} className="text-[#0077b5]" />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                name="social_linkedin"
                value={formData.social_linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/company/ebenyx"
                className="w-full bg-navy border border-gray-800 p-3 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Facebook */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-400 flex items-center gap-1.5">
                <FaFacebook size={11} className="text-[#1877f2]" />
                <span>Facebook URL</span>
              </label>
              <input
                type="url"
                name="social_facebook"
                value={formData.social_facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/ebenyxtchad"
                className="w-full bg-navy border border-gray-800 p-3 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Twitter */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-400 flex items-center gap-1.5">
                <FaTwitter size={11} className="text-[#1da1f2]" />
                <span>Twitter / X URL</span>
              </label>
              <input
                type="url"
                name="social_twitter"
                value={formData.social_twitter}
                onChange={handleChange}
                placeholder="https://twitter.com/ebenyx"
                className="w-full bg-navy border border-gray-800 p-3 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className="bg-gold hover:bg-gold-hover disabled:bg-gray-750 disabled:text-gray-500 text-navy font-bold px-8 py-3.5 rounded-lg flex items-center gap-2 cursor-pointer transition-all"
          >
            <FaSave size={12} />
            {submitting ? 'Enregistrement...' : 'Enregistrer les paramètres'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default Settings;
