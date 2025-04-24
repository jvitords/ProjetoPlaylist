package com.projetoplaylist.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@Entity
public class Playlist implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true)
	private String name;
	private String genre;
	private Integer quantityMusic = 0;
	
	@ManyToMany
	@JoinTable(name = "tb_playlist_music", joinColumns = @JoinColumn(name = "id_playlist"), inverseJoinColumns = @JoinColumn(name = "id_music"))
	private Set<Music> listMusics = new HashSet<>();
	
	public Playlist() {}
	
	public Playlist(Long id, String name, String genre) {
		this.id = id;
		this.name = name;
		this.genre = genre;
	}	
}
