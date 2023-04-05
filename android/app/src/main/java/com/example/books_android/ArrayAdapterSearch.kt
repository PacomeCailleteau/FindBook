package com.example.books_android

import android.content.Context
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.TextView
import com.example.books_android.models.BookModel

class ArrayAdapterSearch(context: Context, collection: List<BookModel>): ArrayAdapter<BookModel>(context, android.R.layout.activity_list_item, collection) {

    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val row: View
        val book = getItem(position)
        val inflater = LayoutInflater.from(context)
        row = inflater.inflate(R.layout.activity_list_view_item, parent,false)

        if (book != null) {
            val image = row.findViewById<ImageView>(R.id.imageLivre)

            // change l'url de l'image du livre si il y en a une
            if (book.cover != null) {
                val uri = Uri.parse(book.cover)
                image.setImageURI(uri)
            } else {
                // sinon on met une image par défaut
                image.setImageResource(R.drawable.not_found)
            }

            row.findViewById<TextView>(R.id.titreLivre).text = book.title
        }
        return row
    }
}
