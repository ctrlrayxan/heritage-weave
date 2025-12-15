import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Upload, X, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CARE_SUGGESTIONS = {
  pashmina: "Dry clean only. Store folded in breathable fabric; avoid direct sunlight and moths. Steam lightly to remove creases.",
  pashtush: "Hand-wash or dry clean recommended. Use mild detergent, dry flat. Handle embellishments with care.",
  jewellery: "Store in a dry, cool place. Clean with a soft cloth. Avoid contact with perfumes and chemicals.",
  antiques: "Handle with care. Keep away from direct sunlight and moisture. Consult a professional for restoration.",
};

type ProductCategory = "jewellery" | "pashmina" | "pashtush" | "antiques";

type ProductImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  is_hero: boolean;
  display_order: number;
};

export default function AdminProductEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = id === "new";

  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    sku: "",
    category: "" as ProductCategory | "",
    description: "",
    materials: "",
    dimensions: "",
    origin: "",
    provenance: "",
    weave_type: "",
    thread_count: "",
    care_instructions: "",
    is_limited_edition: false,
    is_one_of_a_kind: false,
    stock_status: "available",
    watermark_enabled: true,
  });

  useEffect(() => {
    if (!isNew) {
      fetchProduct();
      fetchProductImages();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      toast({ title: "Product not found", variant: "destructive" });
      navigate("/admin/products");
    } else {
      setFormData({
        title: data.title || "",
        sku: data.sku || "",
        category: data.category || "",
        description: data.description || "",
        materials: data.materials || "",
        dimensions: data.dimensions || "",
        origin: data.origin || "",
        provenance: data.provenance || "",
        weave_type: data.weave_type || "",
        thread_count: data.thread_count || "",
        care_instructions: data.care_instructions || "",
        is_limited_edition: data.is_limited_edition || false,
        is_one_of_a_kind: data.is_one_of_a_kind || false,
        stock_status: data.stock_status || "available",
        watermark_enabled: data.watermark_enabled ?? true,
      });
    }
    setIsLoading(false);
  };

  const fetchProductImages = async () => {
    const { data, error } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", id)
      .order("display_order", { ascending: true });

    if (!error && data) {
      setProductImages(data);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (isNew) {
      toast({ title: "Please save the product first before uploading images", variant: "destructive" });
      return;
    }

    setIsUploading(true);

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase
          .from("product_images")
          .insert({
            product_id: id,
            image_url: publicUrl,
            alt_text: formData.title,
            is_hero: productImages.length === 0,
            display_order: productImages.length,
          });

        if (insertError) throw insertError;
      }

      toast({ title: "Images uploaded successfully!" });
      fetchProductImages();
    } catch (error: any) {
      toast({ title: "Error uploading images", description: error.message, variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (imageId: string, imageUrl: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/product-images/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from("product-images").remove([filePath]);
      }

      await supabase.from("product_images").delete().eq("id", imageId);
      toast({ title: "Image deleted" });
      fetchProductImages();
    } catch (error: any) {
      toast({ title: "Error deleting image", variant: "destructive" });
    }
  };

  const setHeroImage = async (imageId: string) => {
    try {
      // Remove hero status from all images
      await supabase
        .from("product_images")
        .update({ is_hero: false })
        .eq("product_id", id);

      // Set new hero image
      await supabase
        .from("product_images")
        .update({ is_hero: true })
        .eq("id", imageId);

      toast({ title: "Hero image updated" });
      fetchProductImages();
    } catch (error: any) {
      toast({ title: "Error updating hero image", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      toast({ title: "Please select a category", variant: "destructive" });
      return;
    }
    
    setIsSaving(true);

    try {
      const submitData = {
        ...formData,
        category: formData.category as ProductCategory,
      };
      
      if (isNew) {
        const { data, error } = await supabase.from("products").insert([submitData]).select().single();
        if (error) throw error;
        toast({ title: "Product created! You can now upload images." });
        navigate(`/admin/products/${data.id}`);
      } else {
        const { error } = await supabase.from("products").update(submitData).eq("id", id);
        if (error) throw error;
        toast({ title: "Product updated successfully!" });
      }
    } catch (error: any) {
      toast({ title: "Error saving product", description: error.message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const applyCareTemplate = () => {
    if (formData.category && CARE_SUGGESTIONS[formData.category as keyof typeof CARE_SUGGESTIONS]) {
      setFormData({
        ...formData,
        care_instructions: CARE_SUGGESTIONS[formData.category as keyof typeof CARE_SUGGESTIONS],
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-gold/20 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link to="/admin/products" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-display text-foreground">
              {isNew ? "Add New Product" : "Edit Product"}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Image Upload Section */}
        {!isNew && (
          <div className="bg-card border border-gold/20 rounded-lg p-6 mb-6">
            <h2 className="font-display text-lg text-foreground border-b border-border pb-2 mb-4">
              Product Images
            </h2>
            
            {/* Current Images */}
            {productImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {productImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_url}
                      alt={image.alt_text || "Product image"}
                      className="w-full aspect-square object-cover rounded-lg border border-border"
                    />
                    {image.is_hero && (
                      <div className="absolute top-2 left-2 bg-gold text-secondary-foreground text-xs px-2 py-0.5 rounded">
                        Hero
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!image.is_hero && (
                        <button
                          onClick={() => setHeroImage(image.id)}
                          className="p-1.5 bg-background/90 rounded-full hover:bg-gold hover:text-secondary-foreground transition-colors"
                          title="Set as hero image"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteImage(image.id, image.image_url)}
                        className="p-1.5 bg-background/90 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                        title="Delete image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Upload Button */}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-gold/50 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  {isUploading ? "Uploading..." : "Click to upload images"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-card border border-gold/20 rounded-lg p-6 space-y-4">
            <h2 className="font-display text-lg text-foreground border-b border-border pb-2">
              Basic Information
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body text-foreground mb-2">Title *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Maharani Gold Necklace"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-foreground mb-2">SKU *</label>
                <Input
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="e.g., JN-001"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-body text-foreground mb-2">Category *</label>
              <Select
                value={formData.category}
                onValueChange={(value: ProductCategory) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jewellery">Jewellery</SelectItem>
                  <SelectItem value="pashmina">Pashmina</SelectItem>
                  <SelectItem value="pashtush">Exclusive Pashtush</SelectItem>
                  <SelectItem value="antiques">Antiques</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-body text-foreground mb-2">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Detailed product description..."
              />
            </div>
          </div>

          {/* Details */}
          <div className="bg-card border border-gold/20 rounded-lg p-6 space-y-4">
            <h2 className="font-display text-lg text-foreground border-b border-border pb-2">
              Product Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body text-foreground mb-2">Materials</label>
                <Input
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  placeholder="e.g., 22K Gold, Uncut Diamonds"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-foreground mb-2">Dimensions</label>
                <Input
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  placeholder="e.g., 18 inches length"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-body text-foreground mb-2">Origin</label>
                <Input
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="e.g., Jaipur, Rajasthan"
                />
              </div>
              <div>
                <label className="block text-sm font-body text-foreground mb-2">Provenance</label>
                <Input
                  value={formData.provenance}
                  onChange={(e) => setFormData({ ...formData, provenance: e.target.value })}
                  placeholder="History or origin story"
                />
              </div>
            </div>

            {(formData.category === "pashmina" || formData.category === "pashtush") && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-body text-foreground mb-2">Weave Type</label>
                  <Input
                    value={formData.weave_type}
                    onChange={(e) => setFormData({ ...formData, weave_type: e.target.value })}
                    placeholder="e.g., Kani, Sozni, Jamawar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-body text-foreground mb-2">Thread Count</label>
                  <Input
                    value={formData.thread_count}
                    onChange={(e) => setFormData({ ...formData, thread_count: e.target.value })}
                    placeholder="e.g., 300+ threads per inch"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Care Instructions */}
          <div className="bg-card border border-gold/20 rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <h2 className="font-display text-lg text-foreground">Care Instructions</h2>
              {formData.category && (
                <Button type="button" variant="ghost" size="sm" onClick={applyCareTemplate}>
                  Apply Template
                </Button>
              )}
            </div>
            <Textarea
              value={formData.care_instructions}
              onChange={(e) => setFormData({ ...formData, care_instructions: e.target.value })}
              rows={3}
              placeholder="Care and handling instructions..."
            />
          </div>

          {/* Badges & Status */}
          <div className="bg-card border border-gold/20 rounded-lg p-6 space-y-4">
            <h2 className="font-display text-lg text-foreground border-b border-border pb-2">
              Badges & Status
            </h2>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="limited"
                  checked={formData.is_limited_edition}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, is_limited_edition: checked as boolean })
                  }
                />
                <label htmlFor="limited" className="text-sm text-foreground">Limited Edition</label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="oneofakind"
                  checked={formData.is_one_of_a_kind}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, is_one_of_a_kind: checked as boolean })
                  }
                />
                <label htmlFor="oneofakind" className="text-sm text-foreground">One-of-a-Kind</label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="watermark"
                  checked={formData.watermark_enabled}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, watermark_enabled: checked as boolean })
                  }
                />
                <label htmlFor="watermark" className="text-sm text-foreground">Watermark Images</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-body text-foreground mb-2">Stock Status</label>
              <Select
                value={formData.stock_status}
                onValueChange={(value) => setFormData({ ...formData, stock_status: value })}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Link to="/admin/products">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={isSaving} className="btn-heritage">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : isNew ? "Create Product" : "Save Changes"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}