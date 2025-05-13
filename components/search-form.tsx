"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { categories, regions } from "@/lib/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  q: z.string().optional(),
  c: z.string().optional(),
  re: z.string().optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  lim: z.number().min(1).max(1000).optional(),
  sort: z.string().optional(),
  qso: z.boolean().optional(),
  shp: z.boolean().optional(),
  urg: z.boolean().optional()
});

export default function SearchForm({
  initialParams
}: {
  initialParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: (initialParams.q as string) || "",
      c: (initialParams.c as string) || "",
      re: (initialParams.re as string) || "",
      priceMin: initialParams.priceMin ? Number(initialParams.priceMin) : undefined,
      priceMax: initialParams.priceMax ? Number(initialParams.priceMax) : undefined,
      lim: initialParams.lim ? Number(initialParams.lim) : 30,
      sort: (initialParams.sort as string) || "datedesc",
      qso: initialParams.qso === "true",
      shp: initialParams.shp === "true",
      urg: initialParams.urg === "true"
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams();

    // Add all form values to search params
    if (values.q) params.set("q", values.q);
    if (values.c) params.set("c", values.c);
    if (values.re) params.set("re", values.re);
    if (values.priceMin) params.set("priceMin", values.priceMin.toString());
    if (values.priceMax) params.set("priceMax", values.priceMax.toString());
    if (values.lim) params.set("lim", values.lim.toString());
    if (values.sort) params.set("sort", values.sort);

    // Always include these boolean params
    params.set("qso", values.qso ? "true" : "false");
    params.set("shp", values.shp ? "true" : "false");
    params.set("urg", values.urg ? "true" : "false");

    // Always include t=s (for sale items)
    params.set("t", "s");

    // Reset pagination
    params.set("start", "0");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="q"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search</FormLabel>
                    <FormControl>
                      <Input placeholder="What are you looking for?" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="c"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="re"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {regions.map(region => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="priceMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min Price (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="0"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Price (€)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="5000"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="sort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort By</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="datedesc">Newest First</SelectItem>
                        <SelectItem value="dateasc">Oldest First</SelectItem>
                        <SelectItem value="priceasc">Price: Low to High</SelectItem>
                        <SelectItem value="pricedesc">Price: High to Low</SelectItem>
                        <SelectItem value="relevance">Relevance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Results Per Page</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={1000}
                        placeholder="30"
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <FormField
                control={form.control}
                name="qso"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Search in title only</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Shipping available</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="urg"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="font-normal">Urgent only</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Search
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
